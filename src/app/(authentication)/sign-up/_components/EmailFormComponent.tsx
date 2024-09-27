"use client";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import AnimatedInput from "./AnimatedInput";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthState } from "@auth/hooks/useAuthStatus";
import ErrorDisplay from "@auth/components/ErrorDisplay";
import LoadingCircle from "./LoadingCircle";
import {
  AuthAction,
  EmailForm,
  useAuthContext,
} from "@auth/context/AuthContext";
import { AnimatePresence, motion } from "framer-motion"; // importing framer-motion

interface EmailFormProps {
  authAction: AuthAction;
}

const EmailFormComponent: React.FC<EmailFormProps> = ({ authAction }) => {
  const { authState, authServerError, onEmailFormSubmit } = useAuthContext();
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useFormContext<EmailForm>();

  const [showErrorIcon, setShowErrorIcon] = useState(false);

  useEffect(() => {
    setFocus("email");

    if (authState === AuthState.Error) {
      // Show (X) for 1 second, then back to "Send code"
      setShowErrorIcon(true);
      const timer = setTimeout(() => {
        setShowErrorIcon(false);
      }, 1000);

      return () => clearTimeout(timer); // cleanup
    }
  }, [authState, setFocus]);

  const renderButtonContent = () => {
    if (showErrorIcon) {
      return <X className="mr-2" />; // showing the (X) on error
    }

    switch (authState) {
      case AuthState.Success:
        return <Check />;
      case AuthState.Submitting:
        return <LoadingCircle />;
      default:
        return "Send code";
    }
  };

  return (
    <div className="min-w-full flex-col">
      <form
        onSubmit={handleSubmit((data) => onEmailFormSubmit(data, authAction))}
      >
        <div className="flex flex-col gap-y-4">
          <AnimatedInput
            id="email"
            type="text"
            prompt="Enter your email"
            {...register("email")}
            placeholder="example@example.com"
            disabled={authState === AuthState.Submitting}
            error={errors.email?.message}
          />
          <div>
            <Button
              type="submit"
              disabled={authState === AuthState.Submitting}
              className={cn("w-full bg-primary transition-all", {
                "pulse-once-red": authState === AuthState.Error, // pulse on error
              })}
              size={"lg"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={showErrorIcon ? "error" : authState} // key changes trigger animations
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
            <ErrorDisplay className="mt-2" errors={authServerError} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmailFormComponent;
