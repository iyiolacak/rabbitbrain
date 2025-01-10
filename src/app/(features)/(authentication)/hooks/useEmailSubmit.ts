import { SignInForm, UseSubmit } from "../types";
import { normalizeError } from "../utils/utils";

export const useEmailSubmit = ({ dispatch, signIn }: UseSubmit) => {
  const submitEmail = async (formData: SignInForm) => {
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
    } catch (err) {
      const standardizedError = normalizeError(err);

      console.log("onEmailFormSubmit `void signIn error:", err);
      dispatch({ type: "set_auth_error", payload: standardizedError });
    } finally {
      dispatch({ type: "set_auth_state", payload: "Success" }); // or "Idle"
    }
  };

  return { submitEmail, useEmailSubmit };
};
