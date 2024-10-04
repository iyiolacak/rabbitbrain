import { useAuthContext } from "../(authentication)/context/AuthContext";
import { AuthStage } from "@auth/hooks/useAuthStatus";
import { useCallback } from "react";

/**
 * Custom hook to handle back action in the authentication flow.
 * Allows moving between different authentication stages, such as moving back from the OTP stage to the form stage.
 */
export const useHandleBack = () => {
  const { authStage, setStage } = useAuthContext();

  const handleBack = useCallback(() => {
    if (authStage === AuthStage.Verifying) {
      setStage(AuthStage.Form); // Move back to the form stage when verifying
    }
  }, [authStage, setStage]);

  return handleBack;
};