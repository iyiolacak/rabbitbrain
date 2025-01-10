import { z } from "zod";
import { emailFormSchema, otpCodeSchema } from "./utils/validationSchemas";
import { ConvexAuthActionsContext } from "@convex-dev/auth/react";
import { AuthReducerAction } from "./utils/utils";
import { Dispatch } from "react";

// AuthObject represents the current state of the authentication process.
export interface AuthObject {
  method: AuthMethod;
  stage: AuthStage;
  state: AuthFormState;
  error?: NormalizedAPIError | null; // error attributes existence means there is an error—So feel free to do conditional checks on `error` existence.
}
export type NormalizedAPIError = {
  message: string;
  code: string;
  meta?: any;
};

// type AuthErrorMeta =
//   | [{ field?: string; validationRule?: string }] /* Validation error */
//   | { endpoint?: string; statusCode?: number } /* Server */
//   | { [key: string]: unknown }; /* Fallback for unknown */

export type AuthMethod = "Email" | "Phone";

export type AuthFormState = "Idle" | "Submitting" | "Success" | "Error";

export type AuthStage = "signIn" | SignInForm; // When email submitted, authStage becomes the submitted object from email-undefined("signIn") stage
//                                 ^{ email: string; }

export type EmailForm = z.infer<typeof emailFormSchema>;
export type CodeForm = z.infer<typeof otpCodeSchema>;

export type SignInForm = EmailForm;
export type SignInAndCodeForm = EmailForm & CodeForm;

export type SignInFunction = ConvexAuthActionsContext["signIn"];

export type onSubmitType = (
  dispatch: Dispatch<AuthReducerAction>,
  signIn: SignInFunction,
  formData: SignInForm // { email: string }, that's it 
) => void;

export interface UseSubmit {
  dispatch: Dispatch<AuthReducerAction>;
  signIn: SignInFunction;
  formData: SignInForm;
}
