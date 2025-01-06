"use client";

import React, {
  createContext,
  Dispatch,
  useContext,
  useReducer,
  useState,
} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { AuthObject, EmailForm, CodeForm } from "../types";
import { emailFormSchema, otpCodeSchema } from "../utils/validationSchemas";
import { initialAuthObject } from "../forms/email/constants";
import { authObjectReducer, AuthReducerAction } from "../utils/utils";

// Context interface
export interface AuthContextValue {
  shakeState: Record<string, boolean>;

  emailFormMethods: UseFormReturn<EmailForm>;
  CodeFormMethods: UseFormReturn<CodeForm>;

  authObject: AuthObject;
  dispatch: Dispatch<AuthReducerAction>;
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

  const [authObject, dispatch] = useReducer(
    authObjectReducer,
    initialAuthObject
  );

  const isCodeStage = typeof authObject.stage !== "string";

  const emailFormMethods = useForm<EmailForm>({
    resolver: zodResolver(emailFormSchema),
  });
  const CodeFormMethods = useForm<CodeForm>({
    resolver: zodResolver(otpCodeSchema),
  });

  // Context Value

  const contextValue: AuthContextValue = {
    shakeState: util.shakeState,
    emailFormMethods,
    CodeFormMethods,
    authObject,
    dispatch,
    // onOTPFormSubmit,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <FormProvider {...emailFormMethods}>{children}</FormProvider>
    </AuthContext.Provider>
  );
};

export default { useAuthContext, AuthProvider };
