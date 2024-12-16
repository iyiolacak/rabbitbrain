import { ClerkAPIError, SignInResource, SignUpResource } from "@clerk/types";
import { AuthHandlers } from "@/app/hooks/auth/AuthHandlers";
import { AuthStage, useAuthStatus } from "@/app/features/authentication/hooks/useAuthStatus";
import { EmailForm, OTPCodeForm } from "@/app/features/authentication/context/AuthContext";
import { getClerkError } from "@auth/hooks/auth/clerkErrorHandler";
import { AuthFlow } from "@/app/features/authentication/context/AuthContext";

// =============================================================================
// Types and Utilities
// =============================================================================

export interface AuthHandlerUtils {
  startSubmission: () => void;
  markSuccess: () => void;
  setStage: (stage: AuthStage) => void;
  setSubmittedData: (data: any) => void; // Replace `any` with the exact type.
  handleError: (errors: ClerkAPIError[]) => void;
}

// =============================================================================
// Handlers
// =============================================================================

/**
 * Handles the "Sign Up" process.
 * @param data The email form data.
 * @param signUp The Clerk SignUpResource.
 * @param utils Utility methods like startSubmission, markSuccess, etc.
 */
export const handleSignUp = async (
  data: EmailForm,
  signUp: SignUpResource,
  utils: AuthHandlerUtils
) => {
  utils.startSubmission();

  try {
    // Step 1: Create the sign-up resource
    await signUp.create({ emailAddress: data.email });
    utils.setSubmittedData(data);

    // Step 2: Trigger email verification
    await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

    // Step 3: Transition to "Verifying" stage
    utils.setStage(AuthStage.Verifying);
    utils.markSuccess();
  } catch (error) {
    // Handle errors
    const clerkErrors = getClerkError(error);
    if (clerkErrors) utils.handleError(clerkErrors);
  }
};

/**
 * Handles the "Sign In" process.
 * @param data The email form data.
 * @param signIn The Clerk SignInResource.
 * @param utils Utility methods like startSubmission, markSuccess, etc.
 */
export const handleSignIn = async (
  data: EmailForm,
  signIn: SignInResource,
  utils: AuthHandlerUtils
) => {
  utils.startSubmission();

  try {
    // Step 1: Create the sign-in resource
    await signIn.create({ identifier: data.email });
    utils.setSubmittedData(data);

    // Step 2: Prepare first-factor verification (e.g., email code)
    const emailFactor = signIn.supportedFirstFactors?.find(
      (factor) => factor.strategy === "email_code"
    );

    if (!emailFactor || !("emailAddressId" in emailFactor)) {
      throw new Error("Email verification is not available");
    }

    await signIn.prepareFirstFactor({
      strategy: "email_code",
      emailAddressId: emailFactor.emailAddressId,
    });

    // Step 3: Transition to "Verifying" stage
    utils.setStage(AuthStage.Verifying);
    utils.markSuccess();
  } catch (error) {
    // Handle errors
    const clerkErrors = getClerkError(error);
    if (clerkErrors) utils.handleError(clerkErrors);
  }
};

/**
 * Handles OTP code verification.
 * @param data The OTP form data.
 * @param signUp The Clerk SignUpResource.
 * @param utils Utility methods like startSubmission, markSuccess, etc.
 * @param setSignUpActive Clerk's method to set the active session.
 */
export const handleVerifyOTP = async (
  data: OTPCodeForm,
  flow: AuthFlow,
  signUp: SignUpResource,
  utils: AuthHandlerUtils,
  setSignUpActive: (args: { session: string }) => Promise<void>
) => {
  utils.startSubmission();

  try {
    // Attempt to verify the OTP code
    const result = await signUp.attemptEmailAddressVerification({
      code: data.OTPCode,
    });

    if (result.status === "complete") {
      // OTP verification successful
      utils.setStage(AuthStage.Completed);
      utils.markSuccess();

      // Check if the session ID exists
      if (!result.createdSessionId) {
        throw new Error("No session ID was created. Verification failed.");
      }

      // Activate the session
      await setSignUpActive({ session: result.createdSessionId });
    } else {
      throw new Error("Unexpected verification status");
    }
  } catch (error) {
    // Handle errors
    const clerkErrors = getClerkError(error);
    if (clerkErrors) utils.handleError(clerkErrors);
  }
};

/**
 * Handles resending the OTP code.
 * @param signUp The Clerk SignUpResource.
 * @param signIn The Clerk SignInResource.
 * @param utils Utility methods like startSubmission, markSuccess, etc.
 */
export const handleResendCode = async (
  signUp: SignUpResource,
  signIn: SignInResource,
  utils: AuthHandlerUtils
) => {
  utils.startSubmission();

  try {
    if (signUp.status === "missing_requirements") {
      // Prepare email verification for sign-up
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } else if (signIn.status === "needs_first_factor") {
      // Prepare email verification for sign-in
      const emailFactor = signIn.supportedFirstFactors?.find(
        (factor) => factor.strategy === "email_code"
      );

      if (!emailFactor || !("emailAddressId" in emailFactor)) {
        throw new Error("Email verification not available");
      }

      await signIn.prepareFirstFactor({
        strategy: "email_code",
        emailAddressId: emailFactor.emailAddressId,
      });
    } else {
      throw new Error("Unexpected auth state for resending code");
    }

    // Mark success if everything goes well
    utils.markSuccess();
  } catch (error) {
    // Handle errors
    const clerkErrors = getClerkError(error);
    if (clerkErrors) utils.handleError(clerkErrors);
  }