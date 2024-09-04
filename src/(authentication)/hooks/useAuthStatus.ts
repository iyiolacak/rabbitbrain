import { useState } from "react";
import { ClerkAPIError } from "@clerk/types";
import { EmailForm } from "@/context/AuthContext";

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

type UseAuthStatusReturn = {
  authState: AuthState;
  authServerError: ClerkAPIError[] | undefined;
  authStage: AuthStage;
  startSubmission: () => void;
  markSuccess: () => void;
  handleError: (errors: ClerkAPIError[]) => void;
  handleOAuthServerError: (errors: ClerkAPIError[]) => void;
  oauthServerError: ClerkAPIError[] | undefined;
  setStage: (stage: AuthStage) => void;
  resetSubmittingState: () => void;
  resetAuth: () => void;
  shakeState: Record<string, boolean>;
  triggerShake: (field: string) => void;
  resetShake: (field: string) => void;
  setSubmittedData: (submittedData: AuthFormValuesType | undefined) => void;
  submittedData: AuthFormValuesType | undefined;
};

/**
 * useAuthStatus - A hook to manage authentication states, stages, and errors.
 *
 * @returns {UseAuthStatusReturn} - The current authentication state, error information, and handlers.
 */
export const useAuthStatus = (): UseAuthStatusReturn => {
  const [authState, setAuthState] = useState<AuthState>(AuthState.Idle);
  const [authServerError, setAuthServerError] = useState<
    ClerkAPIError[] | undefined
  >(undefined);
  const [oauthServerError, setOAuthServerError] = useState<
    ClerkAPIError[] | undefined
  >(undefined);
  const [authStage, setAuthStage] = useState<AuthStage>(AuthStage.Form);
  const [shakeState, setShakeState] = useState<Record<string, boolean>>({});
  const [submittedData, setSubmittedData] = useState<AuthFormValuesType | undefined>(undefined);

  /**
   * Triggers a visual shake effect for a specific field.
   */
  const triggerShake = (field: string) => {
    setShakeState((prevState) => ({
      ...prevState,
      [field]: true,
    }));
    setTimeout(() => resetShake(field), 500);
  };

  const resetShake = (field: string) => {
    setShakeState((prevState) => ({
      ...prevState,
      [field]: false,
    }));
  };

  const startSubmission = () => {
    setAuthState(AuthState.Submitting);
    setAuthServerError(undefined);
    setOAuthServerError(undefined);
  };

  const markSuccess = () => {
    setAuthState(AuthState.Success);
  };

  const handleServerError = (errors: ClerkAPIError[]) => {
    setAuthState(AuthState.Error);
    setAuthServerError([...errors]);

    // Trigger shake for each error field
    errors.forEach((error) => {
      const field = error.code; // Assuming 'code' represents the field
      triggerShake(field);
    });
  };

  const handleOAuthServerError = (errors: ClerkAPIError[]) => {
    setAuthState(AuthState.Error);
    setOAuthServerError(errors);

    // Trigger shake for OAuth-specific error
    errors.forEach((error) => {
      const field = error.code; // Assuming 'code' represents the field
      triggerShake(field);
    });
  };

  const setStage = (stage: AuthStage) => {
    setAuthStage(stage);
  };

  const resetSubmittingState = () => {
    setAuthState(AuthState.Idle);
  };

  const resetAuth = () => {
    setAuthState(AuthState.Idle);
    setOAuthServerError(undefined);
    setAuthServerError(undefined);
    setShakeState({});
    setStage(AuthStage.Form);
    setSubmittedData(undefined);
  };

  return {
    authState,
    authServerError,
    startSubmission,
    markSuccess,
    handleError: handleServerError,
    handleOAuthServerError,
    oauthServerError,
    setStage,
    authStage,
    resetSubmittingState,
    resetAuth,
    shakeState,
    triggerShake,
    resetShake,
    setSubmittedData,
    submittedData,
  };
};
