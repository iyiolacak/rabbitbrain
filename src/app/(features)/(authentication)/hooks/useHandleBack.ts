import { Dispatch, useCallback } from "react";
import { AuthReducerAction } from "../utils/utils";

export function useHandleBack(dispatch: Dispatch<AuthReducerAction>) {
  const handleBack = useCallback(() => {
    dispatch({ type: "set_auth_stage", payload: "signIn" });
  }, [dispatch]);
  return handleBack;
}
