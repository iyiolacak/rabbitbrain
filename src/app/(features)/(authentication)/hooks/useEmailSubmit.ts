import { useAuthContext } from "../context/AuthContext";
import { SignInForm, UseSubmit } from "../types";
import { normalizeError } from "../utils/utils";

export const useEmailSubmit = ({ dispatch, signIn }: UseSubmit) => {
  const { authObject } = useAuthContext();
  const submitEmail = (formData: SignInForm) => {
    const fd = new FormData();
    fd.set("email", formData.email);
    /**
     * The backend sees there is no code in the form data, so it simply sends the OTP (by email or text).
     */
    void signIn("resend-otp", fd)
      .then((result) => {
        if (!result) {
          // No user object yet -> This is normal for OTP step #1.
          console.log("OTP code was sent. 'result' is null by design.");
        } else {
          // If we *somehow* do get a user object here (rare for OTP flows),
          // handle that scenario. Usually you'd get the user object after
          // the second call with "code" + "email".
          console.log("signIn result:", result); // Log what signIn actually returns
          console.log("Signed in user:", result);
        }

        dispatch({
          type: "set_auth_stage",
          payload: { email: formData.email as string },
        });
        dispatch({
          type: "set_auth_state",
          payload: "Submitting",
        });
        console.log("then:", authObject);
      })
      .catch((err) => {
        // Normalize error
        const standardizedError = normalizeError(err);
        console.log("submitEmail(), `void signIn` error:", err);
        dispatch({ type: "set_auth_error", payload: standardizedError });
      })
      .finally(() => {
        dispatch({ type: "set_auth_state", payload: "Success" }); // or "Idle"
        console.log("finally:", authObject);
      });
  };

  return { submitEmail };
};
