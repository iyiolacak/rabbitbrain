import { useCallback, useState } from "react";
import { ClerkAPIError } from "@clerk/types";
import { AuthObject, SignInForm, AuthStage } from "../types";



type UseAuthStatusReturn = {
  startSubmission: (prev: AuthObject) => void;
  markSuccess: (prev: AuthObject) => void;
  setStep: (prev: AuthObject) => void;
  resetSubmittingState: () => void;
  resetAuth: () => void;
  shakeState: Record<string, boolean>;
  triggerShake: (field: string) => void;
  resetShake: (field: string) => void;
  setSubmittedData: (submittedData: SignInForm | undefined) => void;
  submittedData: SignInForm | undefined;
};

/**
 * useAuthStatus - A custom hook to manage authentication states, stages, and errors.
 *
 * This hook provides utilities for handling the authentication process, including managing 
 * submission states, errors, and different stages of authentication flow. It is intended to 
 * be used within the AuthContext to track and control the auth flow.
 *
 * @returns {UseAuthStatusReturn} An object containing authentication state, error handling,
 * and utility functions such as starting a submission, marking success, handling errors, 
 * and resetting the auth process.
 */
export const useAuthStatus = (): UseAuthStatusReturn => {
  const [authServerError, setAuthServerError] = useState<
  ClerkAPIError[] | undefined
  >(undefined);
  const [oauthServerError, setOAuthServerError] = useState<
  ClerkAPIError[] | undefined
  >(undefined);
  const [shakeState, setShakeState] = useState<Record<string, boolean>>({});
  const [submittedData, setSubmittedData] = useState<
  SignInForm | undefined
  >(undefined);
  /**
   * Triggers a visual shake effect for a specific field.
   */
  const triggerShake = (field: string) => {
    setShakeState((prevState) => ({
      ...prevState,
      [field]: true,
    }));
    // 🤡🤡🤡🤡🤡
    setTimeout(() => resetShake(field), 500);
  };

  const resetShake = (field: string) => {
    setShakeState((prevState) => ({
      ...prevState,
      [field]: false,
    }));
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
    setOAuthServerError(undefined);
    setAuthServerError(undefined);
  };

  /**
   * sets AuthState on Idle * 
  */
  const resetSubmittingState = () => {
    setAuthState(AuthState.Idle);
  };
/**
 * resetAuth Resets the entire authentication state, errors, and form stage.
 * 
 * Clears the authentication state, any errors, and shake effects, and resets the form to its initial state.
 */
  const resetAuth = useCallback(() => {
    setAuthState(AuthState.Idle);
    setOAuthServerError(undefined);
    setAuthServerError(undefined);
    setShakeState({});
    setStage(AuthStage.Form);
    setSubmittedData(undefined);
  }, [  ]);

  return {
    authAction,
    setAuthAction,
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
