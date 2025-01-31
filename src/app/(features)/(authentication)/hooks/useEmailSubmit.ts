import { useAuthContext } from "../context/AuthContext";
import { SignInForm, UseSubmit } from "../types";
import { normalizeError } from "../utils/utils";

/**
 * Custom hook for handling email-based OTP authentication.
 *
 * @param {UseSubmit} param - Object containing `dispatch` function and `signIn` function.
 * @param {Function} param.dispatch - Dispatch function to update authentication state.
 * @param {Function} param.signIn - Function to initiate the sign-in process.
 * @returns {{ submitEmail: (formData: SignInForm) => void }} - Returns the `submitEmail` function for handling email submissions.
 */
export const useEmailSubmit = ({ dispatch, signIn }: UseSubmit) => {
  const { authObject } = useAuthContext();

  /**
   * Submits an email for OTP authentication.
   *
   * @param {SignInForm} formData - Object containing the user's email.
   * @returns {void}
   */
  const submitEmail = (formData: SignInForm) => {
    const fd = new FormData();
    fd.set("email", formData.email);

    /**
     * Initiates the sign-in process with the provided email.
     * The backend recognizes the absence of an OTP code and sends a one-time password (OTP) to the email.
     */
    void signIn("resend-otp", fd)
      .then((result) => {
        if (!result) {
          // No user object yet -> This is normal for OTP step #1.
          console.log("OTP code was sent. 'result' is null by design.");
        } else {
          // Rare scenario: If a user object is returned here, handle accordingly.
          console.log("signIn result:", result);
          console.log("Signed in user:", result);
        }

        // Update authentication state to indicate that an OTP has been requested.
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
        // Normalize error before dispatching.
        const standardizedError = normalizeError(err);
        console.log("submitEmail(), `void signIn` error:", err);
        dispatch({ type: "set_auth_error", payload: standardizedError });
      })
      .finally(() => {
        // Set authentication state to Success or Idle after request completion.
        dispatch({ type: "set_auth_state", payload: "Success" });
        console.log("finally:", authObject);
      });
  };

  return { submitEmail };
};
