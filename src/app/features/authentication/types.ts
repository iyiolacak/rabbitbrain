import { z } from "zod";
import { emailFormSchema, otpCodeSchema } from "./utils/validationSchemas";

// AuthStateMachine represents the current state of the authentication process.
export interface AuthContext {
  flow: AuthFlow;
  method: AuthMethod;
  stage: AuthStage;
  state: AuthFormState;
  error: AuthError | null;
}

const AuthErrorTypes = ["Validation", "Server", "AuthAPI", "Unknown"];

export type AuthErrorType = (typeof AuthErrorTypes)[number];

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

type AuthFlow = "SignUp" | "SignIn";
type AuthMethod = "Email" | "Phone";

// AuthState represents the status of a process.
export type AuthFormState = "Idle" | "Submitting" | "Success" | "Error";

// AuthStage represents the current phase in a multi-step flow.
export type AuthStage = "Form" | "Verifying" | "Completed";

export type AuthAction =
  | "IDLE"
  | "EMAIL_SUBMIT"
  | "EMAIL_SUCCESS"
  | "EMAIL_ERROR"
  | "OTP_SUBMIT"
  | "OTP_SUCCESS"
  | "OTP_ERROR"
  | "RESET";

export type EmailForm = z.infer<typeof emailFormSchema>;
export type OTPCodeForm = z.infer<typeof otpCodeSchema>;

export type AuthFormValuesType = EmailForm;
