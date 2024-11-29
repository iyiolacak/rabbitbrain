import {
  useSignUp as useClerkSignUp,
  useSignIn as useClerkSignIn,
} from "@clerk/clerk-react";
import { SignInResource, SignUpResource } from "@clerk/types";

// Types

type AuthObject = SignInResource | SignUpResource;


// Custom hook for Clerk's sign-up functionality
export const useClerkSignUpAdapter = () => {
    const { isLoaded, signUp, setActive } = useClerkSignUp();
    return { isLoaded, signUp, setActive };
  };

export const useClerkSignInAdapter = () => {
    const { isLoaded, signIn, setActive } = useClerkSignIn();
    return { isLoaded, signIn, setActive };
};

export const prepareEmailVerification = async (signUp, signIn) => {

}