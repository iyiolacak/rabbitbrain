import { z } from "zod";
import { emailFormSchema, otpCodeSchema } from "./context/AuthContext";

export enum AuthState {
    Idle = "Idle",
    Submitting = "Submitting",
    Success = "Success",
    Error = "Error",
  }
export enum AuthStage {
  Form = "Form",
  Verifying = "Verifying",
  Completed = "Completed",
}
export type EmailForm = z.infer<typeof emailFormSchema>;
export type OTPCodeForm = z.infer<typeof otpCodeSchema>;

export type AuthFormValuesType = EmailForm;
  