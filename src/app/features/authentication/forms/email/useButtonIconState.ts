/**
 * A hook that synchronizes a button icon state with authState transitions.
 * When authState becomes Error or Success, the icon updates and reverts after a timeout.
 */

import { AuthState } from "../../types";

export function useButtonIconState(authState: AuthState) {
    switch(authState) {
        case (AuthState.Submitting): return 
    }

}