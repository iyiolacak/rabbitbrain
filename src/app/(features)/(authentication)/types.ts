import { z } from "zod";
import { emailFormSchema, otpCodeSchema } from "./utils/validationSchemas";
import { ConvexAuthActionsContext } from "@convex-dev/auth/react";

// AuthStateMachine represents the current state of the authentication process.
// TODO:
export interface AuthObject {
  method: AuthMethod;
  stage: AuthStage;
  state: AuthFormState;
  error: AuthAPIError | null;
}
export type AuthAPIError = {
  message: string;
  longMessage?: string;
  code?: string;
  meta?: AuthErrorMeta;
};

type AuthErrorMeta =
  | [{ field?: string; validationRule?: string }] /* Validation error */
  | { endpoint?: string; statusCode?: number } /* Server */
  | { [key: string]: unknown }; /* Fallback for unknown */

export type AuthMethod = "Email" | "Phone";

export type AuthFormState = "Idle" | "Submitting" | "Success" | "Error";

export type AuthStage = "signIn" | SignInForm; // When email submitted, authStage becomes the submitted object from email-undefined("signIn") stage
//                                 ^{ email: string; }

export type EmailForm = z.infer<typeof emailFormSchema>;
export type CodeForm = z.infer<typeof otpCodeSchema>;

export type SignInForm = EmailForm;
export type SignInAndCodeForm = EmailForm & CodeForm;

export type SignInFunction = ConvexAuthActionsContext["signIn"];
