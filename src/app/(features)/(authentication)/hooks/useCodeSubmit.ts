import { Dispatch } from "react";
import { useAuthContext } from "../context/AuthContext";
import { onSubmitType, SignInAndCodeForm, SignInForm, UseSubmit } from "../types";
import { AuthReducerAction } from "../utils/utils";
export const useCodeSubmit = ({ dispatch, signIn }: UseSubmit) => {
  // encapsulated on code submit logic here...
  const onCodeSubmit = (formData: SignInAndCodeForm) =>
    "come on... do something!";
  return { onCodeSubmit, useCodeSubmit };
};
