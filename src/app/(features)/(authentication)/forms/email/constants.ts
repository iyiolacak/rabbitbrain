import { AuthObject } from "../../types";

export const BUTTON_ICON_DURATION = 1500 as const; // Duration in ms

export const SUBMISSION_TIMEOUT_MS = 30_000 as const;

export const transitionVariants: Readonly<
  Record<string, { opacity: number; x: number }>
> = {
  initial: { opacity: 0, x: 150 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -150 },
};

// Y value: Auth Stage indicator - Auth stage is x out of y
export const outOf: number = 2 as const;

// --- Initial Context ---
export const initialAuthObject: AuthObject = {
  method: "Email",
  stage: "signIn",
  state: "Idle",
  error: null,
};
