import { Dispatch } from "react";
import { useAuthContext } from "../context/AuthContext";
import {
  onSubmitType,
  SignInAndCodeForm,
  SignInForm,
  UseSubmit,
} from "../types";
import { AuthReducerAction, normalizeError } from "../utils/utils";
import { action } from "convex/_generated/server";
import { useRouter } from "next/navigation";
export const useCodeSubmit = ({ dispatch, signIn }: UseSubmit) => {
  const router = useRouter();
  // encapsulated on code submit logic here...
  const onCodeSubmit = (formData: SignInAndCodeForm) => {
    try {
      const result = signIn("resend-otp", { code: formData.OTPCode });
      dispatch({ type: "set_auth_state", payload: "Success"})
      router.push("/home")
      
    } catch (err) {
      console.log(err);
      const standardizedError = normalizeError(err);
      dispatch({ type: "set_auth_error", payload: standardizedError });
    }
    
  };
  return { onCodeSubmit };
};
