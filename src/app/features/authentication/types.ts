import { z } from "zod";
import { emailFormSchema, otpCodeSchema } from "./utils/validationSchemas";

// AuthStateMachine represents the current state of the authentication process.
export interface AuthState {
  method: AuthMethod;
  stage: AuthStage;
  state: AuthFormState;
  error: AuthError | null;
}

export type AuthErrorType = "Validation" | "Server" | "AuthAPI" | "Unknown";

export type AuthError = {
  type: AuthErrorType;
  message: string;
  longMessage?: string;
  code?: string;
  meta?: AuthErrorMeta;
};

type AuthErrorMeta =
  | [{ field?: string; validationRule?: string }] /* Validation error */
  | { endpoint?: string; statusCode?: number } /* Server */
  | { [key: string]: unknown }; /* Fallback for unknown */

type AuthMethod = "Email" | "Phone";

// AuthState represents the status of a process.
export type AuthFormState = "Idle" | "Submitting" | "Success" | "Error";

// AuthStage represents the current phase in a multi-step flow.
export type AuthStage = "signIn" | EmailForm;

export type EmailForm = z.infer<typeof emailFormSchema>;
export type OTPCodeForm = z.infer<typeof otpCodeSchema>;

export type AuthFormValuesType = EmailForm;
