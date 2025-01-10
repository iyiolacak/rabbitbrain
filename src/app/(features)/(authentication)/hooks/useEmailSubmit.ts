import { Dispatch } from "react";
import { NormalizedAPIError, SignInForm, SignInFunction, UseSubmit } from "../types";
import { AuthReducerAction } from "../utils/utils";

export const useEmailSubmit = ({
  dispatch,
  signIn,
  formData,
}: UseSubmit) => {
  const submitEmail = async () => {
    try {
      const result = signIn("resend-otp", {
        email: formData.email,
      });

      dispatch({
        type: "set_auth_stage",
        payload: { email: formData.email as string },
      });

      if ("error" in result) {
      }
    } catch (normalizeError(err)) {
      console.log("onEmailFormSubmit `void signIn error:", err);
      dispatch({ type: "set_auth_error", payload: err})
    } finally {
      dispatch({ type: "set_auth_state", payload: "Success" }); // or "Idle"
    }
  };
};
