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
import { getClerkError } from "@/app/features/authentication/clerkErrorHandler";
import {
  AuthFormValuesType,
  AuthStage,
  AuthState,
  useAuthStatus,
} from "@/app/features/authentication/hooks/useAuthStatus";
import useAuthAction from "@/app/hooks/auth/useAuthAction";
import { handleSignIn, handleSignUp } from "@/app/hooks/auth/AuthHandlers";

// ============================================================================
// Constants and Types
// ============================================================================

const SUBMISSION_TIMEOUT_MS = 30_000;

export type AuthFlow = "sign-up" | "sign-in" | "reset-password";

// Validation schemas
export const emailFormSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const otpCodeSchema = z.object({
  OTPCode: z.string().length(6, "The one-time password must be 6 digits long"),
});

export type EmailForm = z.infer<typeof emailFormSchema>;
export type OTPCodeForm = z.infer<typeof otpCodeSchema>;

// Context interface
export interface AuthContextValue {
  authFlow: AuthFlow | null;
  authStage: AuthStage;
  authState: AuthState;
  authServerError: ClerkAPIError[] | undefined;
  shakeState: Record<string, boolean>;
  submittedData: AuthFormValuesType | undefined;
  isResendingCode: boolean;

  emailFormMethods: UseFormReturn<EmailForm>;
  OTPFormMethods: UseFormReturn<OTPCodeForm>;

  onEmailFormSubmit: (data: EmailForm) => Promise<void>;
  onOTPFormSubmit: (data: OTPCodeForm) => Promise<void>;

  setSubmittedData: (data: AuthFormValuesType) => void;
  setStage: (stage: AuthStage) => void;
  resendEmailCode: () => Promise<void>;
  resetAuth: () => void;
}

// ============================================================================
// Context Creation
// ============================================================================

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuthContext = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

// ============================================================================
// Authentication Provider Component
// ============================================================================

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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
  const { authAction } = useAuthAction();
  const util = useAuthStatus();

  const [isResendingCode, setIsResendingCode] = useState(false);

  const emailFormMethods = useForm<EmailForm>({
    resolver: zodResolver(emailFormSchema),
  });
  const OTPFormMethods = useForm<OTPCodeForm>({
    resolver: zodResolver(otpCodeSchema),
  });

  // ========================================================================
  // Utility Functions
  // ========================================================================

  const handleAuthErrors = (error: unknown): void => {
    const clerkErrors = getClerkError(error);
    if (clerkErrors) {
      util.handleError(clerkErrors);
    } else {
      util.handleError([
        { code: "unexpected_error", message: "An unexpected error occurred" },
      ]);
    }
  };

  const prepareEmailCodeResend = async (
    signUp: SignUpResource,
    signIn: SignInResource
  ): Promise<void> => {
    if (signUp.status === "missing_requirements") {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
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
  };

  // ========================================================================
  // Handlers
  // ========================================================================

  const onEmailFormSubmit = async (data: EmailForm): Promise<void> => {
    const authHandlerUtils = {
      startSubmission: util.startSubmission,
      markSuccess: util.markSuccess,
      setStage: util.setStage,
      setSubmittedData: util.setSubmittedData,
      handleError: util.handleError,
    };

    if (!authAction) {
      throw new Error("No auth action specified");
    }

    try {
      if (authAction === "sign-up" && isSignUpLoaded) {
        await handleSignUp(data, signUp, authHandlerUtils);
      } else if (authAction === "sign-in" && isSignInLoaded) {
        await handleSignIn(data, signIn, authHandlerUtils);
      } else {
        console.warn("Unsupported or unavailable auth action");
      }
    } catch (error) {
      handleAuthErrors(error);
    }
  };

  const onOTPFormSubmit = async (OTPCodeData: OTPCodeForm): Promise<void> => {
    try {
      util.startSubmission();
      const result = await signUp.attemptEmailAddressVerification({
        code: OTPCodeData.OTPCode,
      });

      if (result.status === "complete") {
        util.setStage(AuthStage.Completed);
        util.markSuccess();
        await setSignUpActive({ session: signUp.createdSessionId });
      } else {
        console.error(
          "Verification incomplete:",
          JSON.stringify(result, null, 2)
        );
      }
    } catch (error) {
      handleAuthErrors(error);
    }
  };

  const resendEmailCode = useCallback(async (): Promise<void> => {
    if (
      !isSignUpLoaded ||
      !isSignInLoaded ||
      util.authStage !== AuthStage.Verifying
    ) {
      console.warn(
        "Cannot resend email code: invalid state or resources not loaded"
      );
      return;
    }

    setIsResendingCode(true);
    try {
      await prepareEmailCodeResend();
      util.markSuccess();
    } catch (error) {
      handleAuthErrors(error);
    } finally {
      setIsResendingCode(false);
    }
  }, [isSignUpLoaded, isSignInLoaded, util.authStage]);

  // ========================================================================
  // Context Value
  // ========================================================================

  const contextValue: AuthContextValue = {
    authFlow: util.authFlow,
    authStage: util.authStage,
    authState: util.authState,
    authServerError: util.authServerError,
    shakeState: util.shakeState,
    submittedData: util.submittedData,
    isResendingCode,

    emailFormMethods,
    OTPFormMethods,

    onEmailFormSubmit,
    onOTPFormSubmit,
    setSubmittedData: util.setSubmittedData,
    setStage: util.setStage,
    resendEmailCode,
    resetAuth: util.resetAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <FormProvider {...emailFormMethods}>{children}</FormProvider>
    </AuthContext.Provider>
  );
};

export default { useAuthContext, AuthProvider };
