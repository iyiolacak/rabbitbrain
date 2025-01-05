"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { useAuthStatus } from "@/app/features/authentication/hooks/useAuthStatus";
import {
  AuthState,
  AuthStage,
  EmailForm,
  OTPCodeForm,
} from "../types";
import { emailFormSchema, otpCodeSchema } from "../utils/validationSchemas";
import { initialAuthStatus } from "../forms/email/constants";

// Context interface

function startSubmission() {
  setAuthStatus((prev) => ({...prev, state: "Submitting"}))
}
function markSuccess(newStage?: AuthStage) {
  setAuthStatus((prev) => ({
    ...prev,
    state: "Success",
    stage: newStage ?? prev.stage
  }))
}
function resetInitialAuthStatus() {
  setAuthStatus((prev) => {
    return {
      ...initialAuthStatus,
      method: prev?.method
    }
  })
}

export interface AuthContextValue {
  authStatus: AuthState;
  shakeState: Record<string, boolean>;

  emailFormMethods: UseFormReturn<EmailForm>;
  CodeFormMethods: UseFormReturn<OTPCodeForm>;

  onEmailFormSubmit: (data: EmailForm) => Promise<void>;
  // onOTPFormSubmit: (data: OTPCodeForm) => Promise<void>;

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

  const [authStatus, setAuthStatus] = useState<AuthState>(initialAuthStatus)


  const emailFormMethods = useForm<EmailForm>({
    resolver: zodResolver(emailFormSchema),
  });
  const CodeFormMethods = useForm<OTPCodeForm>({
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
      startSubmission: startSubmission(),
      markSuccess: markSuccess(),
      setSubmittedData: util.setSubmittedData,
    };
  // ========================================================================
  // Context Value
  // ========================================================================

  const contextValue: AuthContextValue = {
    authStatus,
    shakeState: util.shakeState,
    emailFormMethods,
    CodeFormMethods,

    onEmailFormSubmit,
    // onOTPFormSubmit,
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      <FormProvider {...emailFormMethods}>{children}</FormProvider>
    </AuthContext.Provider>
  );
};
}
export default { useAuthContext, AuthProvider };
