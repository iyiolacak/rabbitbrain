"use client";
import { getClerkError } from "@auth/clerkErrorHandler";
import {
  AuthFormValuesType,
  AuthStage,
  AuthState,
  useAuthStatus,
} from "@auth/hooks/useAuthStatus";
import {
  useSignUp as useClerkSignUp,
  useSignIn as useClerkSignIn,
} from "@clerk/clerk-react";
import { ClerkAPIError, SignInResource, SignUpResource } from "@clerk/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { createContext, useContext } from "react";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

// Validation schema as z object - are sent to OTPForm component.
export const otpCodeSchema = z.object({
  OTPCode: z.string().min(6, "The one-time password must be 6 digits long"),
});

const emailFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type EmailForm = z.infer<typeof emailFormSchema>;

export type OTPCodeForm = z.infer<typeof otpCodeSchema>;


export interface AuthContextValue {
  authStage: AuthStage;
  onEmailFormSubmit: (data: EmailForm, authAction: AuthAction) => Promise<void>;
  onOTPFormSubmit: (data: OTPCodeForm) => Promise<void>;
  emailFormMethods: UseFormReturn<EmailForm>;
  OTPFormMethods: UseFormReturn<OTPCodeForm>;
  submittedData: AuthFormValuesType | undefined;
  authState: AuthState;
  authServerError: ClerkAPIError[] | undefined;
  shakeState: Record<string, boolean>;
}

/**
 * Represents the authentication action.
 *
 * @type {"sign-in" | "sign-up" | "forgot-password"}
 */
export type AuthAction = "sign-up" | "sign-in" | "forgot-password";

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    isLoaded: isSignUpLoaded, // Sign up
    signUp,
    setActive: setSignUpActive,
  } = useClerkSignUp();
  const {
    isLoaded: isSignInLoaded, // Sign in
    signIn,
    setActive: setSignInActive,
  } = useClerkSignIn();

  const {
    setStage,
    handleError,
    markSuccess,
    startSubmission,
    authStage,
    setSubmittedData,
    submittedData,
    authState,
    authServerError,
    shakeState,
    resetSubmittingState,
  } = useAuthStatus();

  const handleSignUp = async (data: EmailForm, signUp: SignUpResource) => {
    startSubmission();
    try {
      await signUp.create({
        emailAddress: data.email,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setSubmittedData(data);
      setStage(AuthStage.Verifying);
      markSuccess();
    } catch (error) {
      const clerkErrors = getClerkError(error);
      if (clerkErrors) {
        handleError(clerkErrors);
      }
    }
  };

  const handleSignIn = async (data: EmailForm, signIn: SignInResource) => {
    startSubmission();
    try {
      await signIn.create({
        identifier: data.email,
      });

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
    } catch (error) {
      const clerkErrors = getClerkError(error);
      if (clerkErrors) {
        handleError(clerkErrors);
      }
    }
  };

  const onEmailFormSubmit = async (data: EmailForm, authAction: AuthAction) => {
    console.log(data, "is the received data");
    console.log(authAction, "is the auth action");
    switch (authAction) {
      case "sign-up":
        if (!isSignUpLoaded) {
          console.warn("Sign-up not loaded yet");
          return;
        }
        handleSignUp(data, signUp);
        console.log("Switch: Sign up case triggered on submit");
        break;
      case "sign-in":
        if (!isSignInLoaded) {
          console.warn("Sign-in not loaded yet");
          return;
        }
        console.log("Switch: Sign in case triggered on submit");
        handleSignIn(data, signIn);
        break;
      default:
        console.error(`Unknown auth action: ${authAction}`);
        throw new Error(`Unsupported auth action: ${authAction}`);
    }
  };

  //

  const SUBMISSION_TIMEOUT = 30000; // 30 seconds

  // TODO: Make it both compatible for sign up and sign in as well.
  const onOTPFormSubmit = async (OTPCodeData: OTPCodeForm) => {
    if (!isSignUpLoaded || !isSignInLoaded) return;

    startSubmission();

    let timeoutId = setTimeout(() => {
      // Reset submission state after timeout
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

      clearTimeout(timeoutId); // Clear the timeout if the submission completes

      if (attemptSignUpEmail.status === "complete") {
        setStage(AuthStage.Completed);
        markSuccess();
        await setSignUpActive({
          session: signUp.createdSessionId,
        });
        // router.push("/home");
      } else {
        console.error(JSON.stringify(attemptSignUpEmail, null, 2)); // pulls up error and next step is; fix this so flow can continue.
      }
    } catch (error) {
      const clerkErrors = getClerkError(error); // Returns err.errors | (property) ClerkAPIResponseError.errors: ClerkAPIError[]
      clearTimeout(timeoutId); // Clear the timeout if an error occurs
      if (clerkErrors) {
        handleError(clerkErrors); // Turns auth state AuthState.Error, gets the errors on the error state to reflect on the UI.
      }
    }
  };

  const emailFormMethods = useForm<EmailForm>({
    resolver: zodResolver(emailFormSchema),
  });
  const OTPFormMethods = useForm<OTPCodeForm>({
    resolver: zodResolver(otpCodeSchema),
  });

  const values: AuthContextValue = {
    authState,
    authServerError,
    shakeState,
    authStage,
    onEmailFormSubmit,
    onOTPFormSubmit,
    emailFormMethods,
    OTPFormMethods,
    submittedData,
  };
  return (
    <AuthContext.Provider value={values}>
      <FormProvider {...emailFormMethods}>{children}</FormProvider>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};

const authContextModule = { useAuthContext, AuthProvider };

export default authContextModule;
