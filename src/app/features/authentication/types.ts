import { z } from "zod";
import { emailFormSchema, otpCodeSchema } from "./context/AuthContext";


type AuthError = {
  type: "Validation" | "Server" | "ClerkAPI" | "Unknown";
  message: string;
  longMessage?: string;
  code?: string;
  meta?: unknown;
}

type AuthFlow = "SignUp" | "SignIn" | "ResetPassword";
type AuthMethod = "Email" | "Phone"

interface AuthStateMachine {
  flow:   AuthFlow;
  method: AuthMethod;
  stage:  "Form" | "Verifying" | "Completed";
  state:  "Idle" | "Submitting" | "Success" | "Error" 
  error:  AuthError;

}
type AuthAction = {
  | "EMAIL_SUBMIT"
  | "EMAIL_SUCCESS"
  | "EMAIL_ERROR"
  | "OTP_SUBMIT"
  | "OTP_SUCCESS"
  | "OTP_ERROR"
  | "RESET"
};
// AuthState represents the status of a process.
export enum AuthState {
    Idle = "Idle",
    Submitting = "Submitting",
    Success = "Success",
    Error = "Error",
  }

// AuthStage represents the current phase in a multi-step flow.
export enum AuthStage {
  Form = "Form",
  Verifying = "Verifying",
  Completed = "Completed",
}
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
  

