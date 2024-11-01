"use client";
import React, { createContext, useCallback, useContext, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import {
  useSignUp as useClerkSignUp,
  useSignIn as useClerkSignIn,
} from "@clerk/clerk-react";
import { ClerkAPIError, SignInResource, SignUpResource } from "@clerk/types";
import { getClerkError } from "@auth/clerkErrorHandler";
import {
  AuthFormValuesType,
  AuthStage,
  AuthState,
  useAuthStatus,
} from "@auth/hooks/useAuthStatus";
import useAuthAction from "@/app/hooks/auth/useAuthAction";

// ============================================================================
// Type Definitions and Schemas
// ============================================================================

export type AuthAction = "sign-up" | "sign-in" | "reset-password";

// Validation schemas
export const otpCodeSchema = z.object({
  OTPCode: z.string().min(6, "The one-time password must be 6 digits long"),
});

const emailFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type EmailForm = z.infer<typeof emailFormSchema>;
export type OTPCodeForm = z.infer<typeof otpCodeSchema>;

// Context interface
export interface AuthContextValue {
  authAction: AuthAction | null;
  authStage: AuthStage;
  authState: AuthState;
  authServerError: ClerkAPIError[] | undefined;
  shakeState: Record<string, boolean>;
  emailAddress: string | null;
  submittedData: AuthFormValuesType | undefined;
  isResendingCode: boolean;
  emailFormMethods: UseFormReturn<EmailForm>;
  OTPFormMethods: UseFormReturn<OTPCodeForm>;
  onEmailFormSubmit: (data: EmailForm) => Promise<void>;
  onOTPFormSubmit: (data: OTPCodeForm) => Promise<void>;
  setStage: (stage: AuthStage) => void;
  resendEmailCode: () => Promise<void>;
  resetAuth: () => void;
}

// ============================================================================
// Context Creation
// ============================================================================

const AuthContext = createContext<AuthContextValue | null>(null);

// ============================================================================
// Authentication Provider Component
// ============================================================================

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize hooks and state
  const {
    isLoaded: isSignUpLoaded,
    signUp,
    setActive: setSignUpActive,
  } = useClerkSignUp();

  const {
    isLoaded: isSignInLoaded,
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
    resetAuth,
    resetSubmittingState,
  } = useAuthStatus();

  const { authAction } = useAuthAction();
  const [emailAddress, setEmailAddress] = useState<string | null>(null);
  const [isResendingCode, setIsResendingCode] = useState(false);

  // Form methods initialization
  const emailFormMethods = useForm<EmailForm>({
    resolver: zodResolver(emailFormSchema),
  });

  const OTPFormMethods = useForm<OTPCodeForm>({
    resolver: zodResolver(otpCodeSchema),
  });

  // ============================================================================
  // Authentication Handlers
  // ============================================================================

  const handleSignIn = async (data: EmailForm, signIn: SignInResource) => {
    startSubmission();
    try {
      await signIn.create({
        identifier: data.email,
      });
      setEmailAddress(data.email);

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

  // ============================================================================
  // Form Submission Handlers
  // ============================================================================

  const onEmailFormSubmit = async (data: EmailForm) => {
    switch (authAction) {
      case "sign-up":
        if (!isSignUpLoaded) return;
        await handleSignUp(data, signUp);
        break;
      case "sign-in":
        if (!isSignInLoaded) return;
        await handleSignIn(data, signIn);
        break;
      case "reset-password":
        console.log("Reset password form submission");
        return;
      default:
        throw new Error(`Unsupported auth action: ${authAction}`);
    }
  };

  const SUBMISSION_TIMEOUT = 30000; // 30 seconds

  const onOTPFormSubmit = async (OTPCodeData: OTPCodeForm) => {
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

  const resendEmailCode = useCallback(async () => {
    if (!signUp || !signIn || authStage !== AuthStage.Verifying) {
      console.warn(
        "Cannot resend email code: resources not loaded or incorrect auth stage"
      );
      return;
    }

    setIsResendingCode(true);
    startSubmission();

    try {
      if (signUp.status === "missing_requirements") {
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
      } else if (signIn.status === "needs_first_factor") {
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
        throw new Error("Unexpected auth state for resending email code");
      }

      markSuccess();
    } catch (error) {
      const clerkErrors = getClerkError(error);
      if (clerkErrors) {
        handleError(clerkErrors);
      } else {
        console.error(
          "An unexpected error occurred while resending the email code:",
          error
        );
        handleError([
          { code: "unexpected_error", message: "An unexpected error occurred" },
        ]);
      }
    } finally {
      setIsResendingCode(false);
    }
  }, [authStage, signUp, signIn, startSubmission, markSuccess, handleError]);

  // ============================================================================
  // Context Provider Setup
  // ============================================================================

  const contextValue: AuthContextValue = {
    authAction,
    authState,
    authServerError,
    shakeState,
    authStage,
    onEmailFormSubmit,
    onOTPFormSubmit,
    emailFormMethods,
    OTPFormMethods,
    submittedData,
    setStage,
    emailAddress,
    resendEmailCode,
    isResendingCode,
    resetAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <FormProvider {...emailFormMethods}>{children}</FormProvider>
    </AuthContext.Provider>
  );
};

// ============================================================================
// Custom Hook
// ============================================================================

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};

export default { useAuthContext, AuthProvider };
