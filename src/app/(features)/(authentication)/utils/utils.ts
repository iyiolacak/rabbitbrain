// import { AuthReducerAction } from "../context/AuthContext";
import { signIn } from "convex/auth";
import {
  AuthAPIError,
  SignInForm as SignInForm,
  AuthObject,
  CodeForm,
  AuthMethod,
  AuthStage,
} from "../types";
import { ConvexAuthActionsContext } from "@convex-dev/auth/react";
import { Dispatch, useReducer } from "react";
import { useAuthContext } from "../context/AuthContext";

export type AuthReducerAction =
  | { type: "set_submitting" }
  | { type: "set_credentials"; payload: SignInForm } // "signIn" | { email: string };
  | { type: "set_otp_code" }
  | { type: "error_occured"; payload: AuthAPIError }
  | { type: "code_form_submitted"; payload: CodeForm }
  | { type: "auth_reset" }
  | { type: "change_method"; payload: AuthMethod };

export function authObjectReducer(
  authObject: AuthObject,
  action: AuthReducerAction
): AuthObject {
  switch (action.type) {
    case "set_credentials":
      return {
        ...authObject,
        stage: action.payload,
      };
    case "set_submitting":
      return {
        ...authObject,
        state: "Submitting",
      };
    case "error_occured":
      return {
        ...authObject,
        state: "Error",
        error: action.payload,
      };
    default:
      return authObject;
  }
}
export type SignInFunction = ConvexAuthActionsContext["signIn"];
export function onEmailSubmit(
  authObject: AuthObject,
  dispatch: Dispatch<AuthReducerAction>,
  signIn: SignInFunction,
  formData: SignInForm
) {
  void signIn("resend-otp", formData).then(() =>
    dispatch({
      type: "set_credentials",
      payload: { email: formData.email as string },
    })
  );
}

export function isStageOnCode(stage: AuthStage): stage is { email: string } {
  return (
    typeof stage === "object" &&
    stage !== null &&
    "email" in stage &&
    typeof stage.email === "string"
  );
}
