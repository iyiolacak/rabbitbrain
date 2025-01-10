import { initialAuthObject } from "../forms/email/constants";
import {
  NormalizedAPIError,
  AuthObject,
  AuthMethod,
  AuthStage,
  AuthFormState,
} from "../types";

export type AuthReducerAction =
  | { type: "set_auth_state"; payload: AuthFormState }
  | { type: "set_auth_stage"; payload: AuthStage } // "signIn" | { email: string };
  | { type: "set_auth_error"; payload: NormalizedAPIError }
  | { type: "auth_reset" }
  | { type: "set_auth_method"; payload: AuthMethod };

export function authObjectReducer(
  authObject: AuthObject,
  action: AuthReducerAction
): AuthObject {
  switch (action.type) {
    case "set_auth_stage": // In other words assign credentials
      return {
        ...authObject,
        stage: action.payload,
      };
    case "set_auth_state":
      return {
        ...authObject,
        state: action.payload,
      };
    case "set_auth_error":
      return {
        ...authObject,
        state: "Error",
        error: action.payload,
      };
    case "auth_reset":
      return {
        ...initialAuthObject,
        method: authObject.method,
      };
    case "set_auth_method":
      return {
        ...authObject,
        method: action.payload,
      };
    default:
      return authObject;
  }
}

export function isStageOnCode(stage: AuthStage): stage is { email: string } {
  return (
    typeof stage === "object" &&
    stage !== null &&
    "email" in stage &&
    typeof stage.email === "string"
  );
}

export function normalizeError(error: any): NormalizedAPIError {
  if(error.response && error.response.data) {
    return {
      code: error.response.data.code || "API_ERROR",
      message: error.response.data.message || "Something went wrong.",
      meta: error.response.data.details || error.response.status,
    }
  }
}
