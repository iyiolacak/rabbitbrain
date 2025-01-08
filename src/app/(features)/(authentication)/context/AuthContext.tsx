"use client";

import React, { createContext, Dispatch, useContext, useReducer } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import {
  AuthObject,
  EmailForm,
  CodeForm,
  SignInForm,
  SignInFunction,
} from "../types";
import { emailFormSchema, otpCodeSchema } from "../utils/validationSchemas";
import { initialAuthObject } from "../forms/email/constants";
import { authObjectReducer, AuthReducerAction } from "../utils/utils";
import { useAuthActions } from "@convex-dev/auth/react";

// Context interface
export interface AuthContextValue {
  emailFormMethods: UseFormReturn<EmailForm>;
  CodeFormMethods: UseFormReturn<CodeForm>;

  authObject: AuthObject;
  dispatch: Dispatch<AuthReducerAction>;

  signIn: SignInFunction;
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
  const [authObject, dispatch] = useReducer(
    authObjectReducer,
    initialAuthObject
  );

  const { signIn } = useAuthActions();

  const emailFormMethods = useForm<EmailForm>({
    resolver: zodResolver(emailFormSchema),
  });
  const CodeFormMethods = useForm<CodeForm>({
    resolver: zodResolver(otpCodeSchema),
  });

  // Context Value

  const contextValue: AuthContextValue = {
    emailFormMethods,
    CodeFormMethods,

    authObject,
    dispatch,

    signIn,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <FormProvider {...emailFormMethods}>{children}</FormProvider>
    </AuthContext.Provider>
  );
};

export default { useAuthContext, AuthProvider };
