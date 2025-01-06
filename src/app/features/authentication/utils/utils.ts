// import { AuthReducerAction } from "../context/AuthContext";
import { AuthError, AuthObject, EmailForm } from "../types";

export type AuthReducerAction =
  | { type: "set_submitting" }
  | { type: "set_server_error"; payload: AuthError }
  | { type: "reset" };

export function authObjectReducer(
  authObject: AuthObject,
  action: AuthReducerAction
): AuthObject {
  switch (action.type) {
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
