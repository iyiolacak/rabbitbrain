import { getClerkError } from "@/app/(authentication)/clerkErrorHandler";
import { useAuthStatus } from "./useAuthStatus";
import { useSignUp } from "@clerk/clerk-react"; 
import { OAuthStrategy } from "@clerk/types";

export const useOAuthHandler = () => {
  const { startSubmission, markSuccess, handleOAuthServerError, resetAuth } = useAuthStatus();
  const { signUp } = useSignUp();

  const handleOAuthClick = async (strategy: OAuthStrategy) => {
    if (!signUp) {
      console.error("SignUp context is unavailable."); // Add more descriptive error logging
      return;
    }

    try {
      startSubmission();
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sign-up/sso-callback",
        redirectUrlComplete: "/onboarding",
      });
      markSuccess();
    } catch (err) {
      const clerkErrors = getClerkError(err);
      if (clerkErrors) {
        handleOAuthServerError(clerkErrors);
      } else {
        console.error("Unhandled error during OAuth sign-up:", err);
      }
    } finally {
      resetAuth();
    }
  };

  return handleOAuthClick;
};

export default useOAuthHandler;
