"use client";

import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ErrorDisplay from "./ErrorDisplay";
import AnimatedInput from "./AnimatedInput";
import { EmailForm as EmailFormValues } from "../types";
import { useAuthActions } from "@convex-dev/auth/react";
import { useAuthContext } from "../context/AuthContext";
type EmailFormProps = {
  disabled?: boolean;
};

const EmailForm: React.FC<EmailFormProps> = () => {
  /* centralizes form logic */
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useFormContext<EmailFormValues>();

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const { signIn } = useAuthActions();

  const { authStatus } = useAuthContext();

  const disabled = authStatus.state === "Submitting";

  return (
    <form
      onSubmit={handleSubmit((data) => signIn("resend-otp", data))}
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
              disabled={disabled}
              error={errors.email?.message}
              {...field}
            />
          )}
        />
          <ErrorDisplay className="mt-2" error={authStatus.error} />
      </div>
    </form>
  );
};

export default EmailForm;
