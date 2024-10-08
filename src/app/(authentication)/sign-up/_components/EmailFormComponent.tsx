"use client";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
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
import { AnimatePresence, motion } from "framer-motion";

const EmailFormComponent = ({ authAction }: { authAction: AuthAction }) => {
  const { authState, authServerError, onEmailFormSubmit } = useAuthContext();
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useFormContext<EmailForm>();

  const [buttonShowIcon, setButtonShowIcon] = useState<'idle' | 'error' | 'success'>('idle');

  useEffect(() => {
    setFocus("email");
    if (authState === AuthState.Error) {
      setButtonShowIcon("error");
      const timer = setTimeout(() => {
        setButtonShowIcon("idle");
      }, 1000);
      return () => clearTimeout(timer);
    } else if (authState === AuthState.Success) {
      setButtonShowIcon("success");
      const timer = setTimeout(() => {
        setButtonShowIcon("idle");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [authState, setFocus]);

  const renderButtonContent = () => {
    switch (buttonShowIcon) {
      case 'error':
        return <X className="mr-2" />;
      case 'success':
        return <Check className="mr-2" />;
      default:
        switch (authState) {
          case AuthState.Submitting:
            return <LoadingCircle />;
          default:
            return "Send code";
        }
    }
  };

  return (
    <div className="min-w-full flex-col">
      <form
        onSubmit={handleSubmit((data) => onEmailFormSubmit(data, authAction))}
      >
        <div className="flex flex-col gap-y-4">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <AnimatedInput
                id="email"
                type="text"
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
              size={"lg"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={showErrorIcon ? "error" : authState}
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
