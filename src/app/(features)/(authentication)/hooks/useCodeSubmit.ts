import { useAuthContext } from "../context/AuthContext";
import { onSubmitType, UseSubmit } from "../types";
export const useCodeSubmit = ({ dispatch, signIn, formData }: UseSubmit) => {
  // encapsulated on code submit logic here...
  const onCodeSubmit = () => "come on... do something!";
  return { onCodeSubmit, useCodeSubmit };
};
