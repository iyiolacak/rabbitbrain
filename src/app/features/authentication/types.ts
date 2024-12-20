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
export type AuthFormValuesType = EmailForm;
  