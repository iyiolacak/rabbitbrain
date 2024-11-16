import { getClerkError } from "@/app/(authentication)/clerkErrorHandler";
import { EmailForm, OTPCodeForm } from "@/app/(authentication)/context/AuthContext";
import {
  AuthFormValuesType,
  AuthStage,
} from "@/app/(authentication)/hooks/useAuthStatus";
import { ClerkAPIError, SignInResource, SignUpResource } from "@clerk/types";

// Types

export interface AuthHandlers {
  startSubmission: () => void;
  markSuccess: () => void;
  setStage: (stage: AuthStage) => void;
  setSubmittedData: (data: AuthFormValuesType) => void;
  handleError: (clerkErrors: ClerkAPIError[]) => void;
}

// Sign up

export const handleSignUp = async (
  data: EmailForm,
  signUp: SignUpResource,
  {
    startSubmission,
    markSuccess,
    setStage,
    setSubmittedData,
    handleError,
  }: AuthHandlers
) => {
  startSubmission();
  try {
    await signUp.create({ emailAddress: data.email });
    setSubmittedData(data);

    await signUp.prepareEmailAddressVerification({
      strategy: "email_code",
    });

    setSubmittedData(data);
    setStage(AuthStage.Verifying);
    markSuccess();
  } catch (error) {
    const clerkErrors = getClerkError(error);
    if (clerkErrors) handleError(clerkErrors);
  }
};

// Sign in

export const handleSignIn = async (
  data: EmailForm,
  signIn: SignInResource,
  {
    startSubmission,
    markSuccess,
    setStage,
    setSubmittedData,
    handleError,
  }: AuthHandlers
) => {
  startSubmission();
  try {
    await signIn.create({
      identifier: data.email,
    });
    setSubmittedData(data);

    const supportedFirstFactors = signIn.supportedFirstFactors;
    const emailCodeFactor = supportedFirstFactors?.find(
      (factor) => factor.strategy === "email_code"
    );
    const phoneCodeFactor = supportedFirstFactors?.find(
      (factor) => factor.strategy === "phone_code"
    );

    if (emailCodeFactor) {
      await signIn.prepareFirstFactor({
        strategy: "email_code",
        emailAddressId: emailCodeFactor.emailAddressId,
      });
    } else if (phoneCodeFactor) {
      await signIn.prepareFirstFactor({
        strategy: "phone_code",
        phoneNumberId: phoneCodeFactor.phoneNumberId,
      });
    } else {
      throw new Error("No valid verification method found.");
    }

    setStage(AuthStage.Verifying);
    markSuccess();
  } catch (error) {
    const clerkErrors = getClerkError(error);
    if (clerkErrors) handleError(clerkErrors);
  }
};

// Resend

const handleResendOTPCode = async (OTPCodeData: OTPCodeForm, ) => {
  if (!isSignUpLoaded || !isSignInLoaded) return;

  startSubmission();
  const timeoutId = setTimeout(() => {
    resetSubmittingState();
    handleError([
      {
        code: "submission_timeout",
        message: "Submission timed out. Please try again.",
      },
    ]);
  }, SUBMISSION_TIMEOUT);

  try {
    const attemptSignUpEmail = await signUp.attemptEmailAddressVerification({
      code: OTPCodeData.OTPCode,
    });

    clearTimeout(timeoutId);

    if (attemptSignUpEmail.status === "complete") {
      setStage(AuthStage.Completed);
      markSuccess();
      await setSignUpActive({
        session: signUp.createdSessionId,
      });
    } else {
      console.error(JSON.stringify(attemptSignUpEmail, null, 2));
    }
  } catch (error) {
    clearTimeout(timeoutId);
    const clerkErrors = getClerkError(error);
    if (clerkErrors) handleError(clerkErrors);
  }
};
