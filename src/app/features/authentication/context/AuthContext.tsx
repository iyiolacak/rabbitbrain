"use client";

import React, { createContext, useContext, useReducer, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { useAuthStatus } from "@/app/features/authentication/hooks/useAuthStatus";
import { AuthObject, EmailForm, OTPCodeForm } from "../types";
import { emailFormSchema, otpCodeSchema } from "../utils/validationSchemas";
import { initialAuthObject } from "../forms/email/constants";
import { authObjectReducer } from "../utils/utils";

// Context interface
export interface AuthContextValue {
  authStatus: AuthObject;
  shakeState: Record<string, boolean>;

  emailFormMethods: UseFormReturn<EmailForm>;
  CodeFormMethods: UseFormReturn<OTPCodeForm>;

  // onEmailFormSubmit: (data: EmailForm) => Promise<void>;
  // onOTPFormSubmit: (data: OTPCodeForm) => Promise<void>;
}
// Context Creation

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuthContext = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

// Authentication Provider Component

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const util = useAuthStatus();

  const [authObject, dispatch] = useReducer(authObjectReducer, initialAuthObject);

  const emailFormMethods = useForm<EmailForm>({
    resolver: zodResolver(emailFormSchema),
  });
  const CodeFormMethods = useForm<OTPCodeForm>({
    resolver: zodResolver(otpCodeSchema),
  });

  // Context Value

  const contextValue: AuthContextValue = {
    authStatus: authObject,
    shakeState: util.shakeState,
    emailFormMethods,
    CodeFormMethods,
    // onOTPFormSubmit,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <FormProvider {...emailFormMethods}>{children}</FormProvider>
    </AuthContext.Provider>
  );
};

export default { useAuthContext, AuthProvider };
