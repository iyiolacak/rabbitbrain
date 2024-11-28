"use client";

import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AuthState } from "@/app/features/authentication/hooks/useAuthStatus";
import {
  AuthAction,
  EmailForm,
  useAuthContext,
} from "@/app/features/authentication/context/AuthContext";
import AnimatedInput from "./AnimatedInput";
import ErrorDisplay from "@/app/features/authentication/components/ErrorDisplay";
import LoadingCircle from "./LoadingCircle";

const BUTTON_ICON_DURATION = 2000;

const EmailFormComponent = ({ authAction }: { authAction: AuthAction }) => {
  const { authState, authServerError, onEmailFormSubmit } = useAuthContext();
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useFormContext<EmailForm>();

  const [buttonIcon, setButtonIcon] = useState<"idle" | "error" | "success">(
    "idle"
  );

  useEffect(() => {
    setFocus("email");

    if (authState === AuthState.Error || authState === AuthState.Success) {
      setButtonIcon(authState === AuthState.Error ? "error" : "success");
      const timer = setTimeout(
        () => setButtonIcon("idle"),
        BUTTON_ICON_DURATION
      );
      return () => clearTimeout(timer);
    }
  }, [authState, setFocus]);

  const renderButtonContent = () => {
    const iconMap = {
      error: <X className="mr-2" />,
      success: <Check className="mr-2" />,
      idle:
        authState === AuthState.Submitting ? <LoadingCircle /> : "Send code",
    };
    return iconMap[buttonIcon];
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onEmailFormSubmit(data))}
      className="w-full"
    >
      <div className="flex flex-col gap-y-4">
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <AnimatedInput
              id="email"
              type="email"
              prompt="Enter your email"
              placeholder="example@example.com"
              disabled={authState === AuthState.Submitting}
              error={errors.email?.message}
              {...field}
            />
          )}
        />
        <div>
          <Button
            type="submit"
            disabled={authState === AuthState.Submitting}
            className={cn("w-full bg-primary transition-all", {
              "pulse-once-red": authState === AuthState.Error,
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
          <ErrorDisplay className="mt-2" errors={authServerError} />
        </div>
      </div>
    </form>
  );
};

export default EmailFormComponent;
