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
  useAuthContext
} from "@/app/features/authentication/context/AuthContext";
import { BUTTON_ICON_DURATION } from "../forms/email/constants";
import { SignInWithMetamaskButton } from "@clerk/clerk-react";

const EmailForm = () => {
  
  const {
      control,
      handleSubmit,
      setFocus,
      formState: { errors },
    } = useFormContext<EmailForm>();
  
    const [buttonIcon, setButtonIcon] = useState<"idle" | "error" | "success">(
      "idle"
    );
  
    const buttonIconTimeout = setTimeout(
      () => setButtonIcon("idle"),
      BUTTON_ICON_DURATION
    );
    return () => clearTimeout(BUTTON_ICON_DURATION);
  }
    useEffect(() => {
      setFocus("email");
  
      if (authState === AuthState.Error || authState === AuthState.Success) {
        setButtonIcon(authState === AuthState.Error ? "error" : "success");
        buttonIconTimeout();
    }, [authState, setFocus]);
  

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
          <ErrorDisplay className="mt-2" errors={authServerError} />
        </div>
      </div>
    </form>
  );
};

export default EmailForm;
