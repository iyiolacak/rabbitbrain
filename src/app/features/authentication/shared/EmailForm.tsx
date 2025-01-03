"use client";

import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ErrorDisplay from "./ErrorDisplay";
import AnimatedInput from "./AnimatedInput";
import { EmailForm as EmailFormValues } from "../types";
import useAuthAction from "@/app/hooks/auth/useAuthAction";

type EmailFormProps = {
  onSuccess: (data: EmailFormValues) => void;
  disabled?: boolean;
};

const EmailForm: React.FC<EmailFormProps> = ({
  onSuccess,
  disabled = false,
}) => {

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

  const { signIn } = useAuthAction();
  return (
    <form
      onSubmit={handleSubmit((data) => )}
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
          <ErrorDisplay className="mt-2" errors={errors} />
        </div>
      </div>
    </form>
  );
};

export default EmailForm;
