import { EmailForm, useAuthContext } from "@/app/(authentication)/context/AuthContext";
import { useAuthStatus } from "@/app/(authentication)/hooks/useAuthStatus";
import { SignUpResource } from "@clerk/types";

const useHandleSignUp = async (data: EmailForm, signUp: SignUpResource) => {

  const { setEmailAddress } = useAuthContext();
  const { startSubmission, markSuccess } = useAuthStatus();
    startSubmission();
    try {
      await signUp.create({ emailAddress: data.email });
      setEmailAddress(data.email);

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
