import { SignInResource, SignUpResource } from "@clerk/types";

export const AuthService = (signUp: SignUpResource, signIn: SignInResource) => {
    
    return {
      signUp,
      signIn,
    };
  };
  