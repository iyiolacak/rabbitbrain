import { SignInForm, UseSubmit } from "../types";
import { normalizeError } from "../utils/utils";

export const useEmailSubmit = ({ dispatch, signIn }: UseSubmit) => {
  const submitEmail = (formData: SignInForm) => {
    void signIn("resend-otp", {
      email: formData.email,
    })
      .then(() => {
        dispatch({
          type: "set_auth_stage",
          payload: { email: formData.email as string },
        });
      })
      .catch((err) => {
        // Normalize error
        const standardizedError = normalizeError(err);
        console.log("submitEmail(), `void signIn` error:", err);
        dispatch({ type: "set_auth_error", payload: standardizedError });
      })
      .finally(() => {
        dispatch({ type: "set_auth_state", payload: "Success" }); // or "Idle"
      });
  };

  return { submitEmail };
};
