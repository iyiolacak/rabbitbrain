import { getClerkError } from "@/app/(authentication)/clerkErrorHandler";
import {
  AuthContextValue,
  EmailForm,
  useAuthContext,
} from "@/app/(authentication)/context/AuthContext";
import {
  AuthFormValuesType,
  AuthStage,
  useAuthStatus,
} from "@/app/(authentication)/hooks/useAuthStatus";
import { ClerkAPIError, SignUpResource } from "@clerk/types";

interface AuthHandlers {
  startSubmission: () => void;
  markSuccess: () => void;
  setStage: (stage: AuthStage) => void;
  setSubmittedData: (data: AuthFormValuesType) => void;
  handleError: (clerkErrors: ClerkAPIError[]) => void;
}

const handleSignUp = async (
  data: EmailForm,
  signUp: SignUpResource,
  {
    startSubmission,
    markSuccess,
    setStage,
    setSubmittedData,
    handleError,
  }: AuthHandlers
) => {

  startSubmission();
  try {
    await signUp.create({ emailAddress: data.email });
    setSubmittedData(data);

    await signUp.prepareEmailAddressVerification({
      strategy: "email_code",
    });

    setSubmittedData(data);
    setStage(AuthStage.Verifying);
    markSuccess();
  } catch (error) {
    const clerkErrors = getClerkError(error);
    if (clerkErrors) handleError(clerkErrors);
  }
};
