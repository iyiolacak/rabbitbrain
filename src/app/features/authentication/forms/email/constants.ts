import { AuthState } from "../../types";

export const BUTTON_ICON_DURATION = 1500; // Duration in ms

export const SUBMISSION_TIMEOUT_MS = 30_000;


// --- Initial Context ---
export const initialAuthStatus: AuthState = {
  method: "Email",
  stage: "signIn",
  state: "Idle",
  error: null,
};
