"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { useAuthStatus } from "@/app/features/authentication/hooks/useAuthStatus";
import {
  AuthFormValuesType,
  AuthStage,
  EmailForm,
  OTPCodeForm,
} from "../types";
import { emailFormSchema, otpCodeSchema } from "../utils/validationSchemas";

// ============================================================================
// Constants and Types
// ============================================================================

const SUBMISSION_TIMEOUT_MS = 30_000;


// Context interface
export interface AuthContextValue {
  authStage: AuthStage;
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
  const util = useAuthStatus();

  const emailFormMethods = useForm<EmailForm>({
    resolver: zodResolver(emailFormSchema),
  });
  const OTPFormMethods = useForm<OTPCodeForm>({
    resolver: zodResolver(otpCodeSchema),
  });

  // ========================================================================
  // Utility Functions
  // ========================================================================

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

  const onOTPFormSubmit = async (OTPCodeData: OTPCodeForm): Promise<void> => {
    try {
      util.startSubmission();
        util.markSuccess();
    }
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
      await prepareEmailCodeResend(signUp, signIn);
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
    authStage: util.authStage,
    authState: util.authState,
    authServerError: util.authServerError,
    shakeState: util.shakeState,
    submittedData: util.submittedData,

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
