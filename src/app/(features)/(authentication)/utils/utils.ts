// import { AuthReducerAction } from "../context/AuthContext";
import {
  AuthAPIError,
  SignInForm as SignInForm,
  AuthObject,
  EmailForm,
  CodeForm,
  AuthMethod,
} from "../types";

export type AuthReducerAction =
  | { type: "set_submitting" }
  | { type: "signin_form_submitted"; payload: SignInForm }
  | { type: "error_occured"; payload: AuthAPIError }
  | { type: "code_form_submitted"; payload: CodeForm }
  | { type: "auth_reset" }
  | { type: "change_method"; payload: AuthMethod };

export function authObjectReducer(
  authObject: AuthObject,
  action: AuthReducerAction
): AuthObject {
  switch (action.type) {
    case "signin_form_submitted":
      return {
        ...authObject,
        stage: action.payload,
      };
    case "error_occured":
      return {
        ...authObject,
        state: "Error",
        error: action.payload,
      };
    case "set_submitting":
      return {
        ...authObject,
        state: "Submitting",
      };
    default:
      return authObject;
  }
}

export const onEmailFormSubmit = async (data: EmailForm): Promise<void> => {};
