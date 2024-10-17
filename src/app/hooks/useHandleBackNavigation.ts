import { useAuthContext } from "../(authentication)/context/AuthContext";
import { AuthStage } from "@auth/hooks/useAuthStatus";
import { useCallback } from "react";

/**
 * Custom hook to handle back action in the authentication flow.
 * Allows moving between different authentication stages.
 * @param {AuthStage} targetStage - The stage to move back to.
 * @returns {() => void} A function to handle the back action.
 */
export const useHandleBack = (targetStage: AuthStage = AuthStage.Form) => {
  const { authStage, setStage } = useAuthContext();

  const handleBack = useCallback(() => {
    if (authStage !== targetStage) {
      setStage(targetStage);
    }
  }, [authStage, setStage, targetStage]);

  return handleBack;
};