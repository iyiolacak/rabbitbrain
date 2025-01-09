/**
 * A hook that synchronizes a button icon state with authState transitions.
 * When authState becomes Error or Success, the icon updates and reverts after a timeout.
 */

import { JSX, useState } from "react";
import LoadingCircle from "../../shared/LoadingCircle";
import { Check, X } from "iconoir-react";
import { AuthObject } from "../../types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonStates = JSX.Element | typeof idleText;

const idleText = "Send code";

export function SubmitButton(authObject: AuthObject) {
  /* This is the default (idle) text for the button. */
  const buttonStates: Record<AuthObject["state"], ButtonStates> = {
    "Idle": idleText,
    "Submitting": <LoadingCircle />,
    "Success": <Check className="mr-2" />,
    "Error": <X className="mr-2" />,
  };
  const [buttonIcon, setButtonIcon] = useState<ButtonStates>(idleText);

  if (authObject.error) {
      setButtonIcon(iconMap[error]);
  }
} return (
  <Button
    type="submit"
    disabled={authObject.state === "Submitting"}
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
