/**
 * A hook that synchronizes a button icon state with authState transitions.
 * When authState becomes Error or Success, the icon updates and reverts after a timeout.
 */

import { useState } from "react";
import LoadingCircle from "../../shared/LoadingCircle";
import { AuthState } from "../../types";
import { Check, X } from "iconoir-react";

type ButtonStates = JSX.Element | typeof idleText;

const idleText = "Send code";

export function SubmitButton(authState: AuthState) {
  /* This is the default (idle) text for the button. */
  const buttonStates: Record<AuthState, ButtonStates> = {
    [AuthState.Idle]: idleText,
    [AuthState.Submitting]: <LoadingCircle />,
    [AuthState.Success]: <Check className="mr-2" />,
    [AuthState.Error]: <X className="mr-2" />,
  };
  const [buttonIcon, setButtonIcon] = useState<ButtonStates>(idleText);

  switch (authState) {
    case AuthState.Error:
      setButtonIcon(iconMap[error]);
  }
} (
  <Button
    type="submit"
    disabled={authState === AuthState.Submitting}
    className={cn("w-full bg-primary transition-all", {
      "pulse-once-red": "authState === AuthState.Error",
    })}
    size="lg"
  >
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={buttonIcon}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        className="flex items-center justify-center"
      >
        {renderButtonContent()}
      </motion.div>
    </AnimatePresence>
  </Button>
);
