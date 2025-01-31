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

// To be used at auth context
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

/**
 * Determines if the authentication stage corresponds to code entry.
 *
 * @param {AuthStage} stage - The authentication stage (`authObject.stage`).
 * If `stage` is an object containing an `email` field(`{ email: string }`),
 * it indicates that the suer has submitted an email and is on the OTP code entry stage.
 *
 * @returns {stage is { email: string }}, returns `true` if user is on the code entry stage.
 * meaning an email has been submitted. Otherwise, returns `false`.
 *  unless authObject.state is successful(which means code entry happened and it was successful, so user should have been redirected.)
 *
 * Note: Again, there is a crucial nuance – The fact that authObject.state might be successful and this would still return `true`.
 */

export function isStageOnCode(stage: AuthStage): stage is { email: string } {
  return (
    typeof stage === "object" &&
    stage !== null &&
    "email" in stage &&
    typeof stage.email === "string"
  );
}

/**
 * Normalizes various types of error objects into a standardized structure, single format.
 *
 * This function inspects the `error` parameter, checking for the presence
 * of `error.response.data` (typical in Axios or similar HTTP libraries),
 * a native JavaScript `Error`, or a string. It then consructs a
 * `NormalizedAPIError` with consistent fields.
 *
 * @param {any} error - The error object to normalize. This can be:
 * - An HTTP error response object (e.g., `axios` error).
 * - A native JS `Error`
 * - A string message.
 * - Any other unknown type.
 *
 * @returns {NormalizedAPIError} A normalized error object with the shape:
 * - `code`: string (e.g. "API_ERROR", "JS_ERROR", "UNKNOWN_ERROR")
 * - `message`: string containing the error's message.
 * - `meta?`: any additional details, if available
 *
 * Example return objects:
 *
 * 1. If `error.response.data` exists:
 * {
 * code:    "API_ERROR" or provided `error.response.data.code`,
 * message: "Something went wrong." or `error.response.data.message`,
 * meta:    Any additional details (e.g., `error.response.data.details` or `error.response.status`)
 * }
 *
 * 2. If `error` is a native Error:
 * {
 * code:    "JS_ERROR",
 * message: error.message,
 * }
 *
 * 3. If `error` is a string:
 * {
 * code:    "UNKNOWN_ERROR",
 * message: error
 * }
 *
 * 4. Otherwise:
 * {
 * code:    "UNKNOWN_ERROR",
 * message: "An unknown error occured."
 * }
 *
 */
export function normalizeError(error: any): NormalizedAPIError {
  if (error.response && error.response.data) {
    return {
      code: error.response.data.code || "API_ERROR",
      message: error.response.data.message || "Something went wrong.",
      meta: error.response.data.details || error.response.status,
    };
  } else if (error instanceof Error) {
    return {
      code: "JS_ERROR",
      message: error.message,
    };
  } else if (error === "string") {
    return {
      code: "UNKNOWN_ERROR",
      message: error,
    };
  }
  return {
    code: "UNKNOWN_ERROR",
    message: "An unknown error occured.",
  };
}
