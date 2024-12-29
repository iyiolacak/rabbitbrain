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

type AuthErrorType = (typeof AuthErrorTypes)[number];

type AuthError = {
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

/* Email Form Submission

  AuthStage.Form: the stage where the user fills out the email form.
  AuthState.Submitting: Tracks the submission state.
  AuthState.Success: Indicates successful form submission.
  AuthState.Error: e.g., invalid email, server error.

OTP Verification

  AuthStage.Verifying: Represents the OTP verification stage.
  AuthState.Submitting: Tracks the state while the OTP is being verified.
  AuthState.Success: Indicates successful OTP verification.
  AuthState.Error: e.g., incorrect or expired OTP.

Completion

AuthStage.Completed: Represents the final state after successful authentication.

**/
export type EmailForm = z.infer<typeof emailFormSchema>;
export type OTPCodeForm = z.infer<typeof otpCodeSchema>;

export type AuthFormValuesType = EmailForm;
