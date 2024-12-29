import { AuthContext } from "../../types";

export const BUTTON_ICON_DURATION = 1500; // Duration in ms

// --- Initial Context ---
export const initialAuthContext: AuthContext = {
  flow: "SignIn", // Default flow
  method: "Email",
  stage: "Form",
  state: "Idle",
  error: null,
};
