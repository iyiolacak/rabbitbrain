"use client";

import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import APIErrorComponent from "./ErrorDisplay";
import AnimatedInput from "./AnimatedInput";
import { EmailForm as EmailFormValues, OnEmailSubmitType } from "../types";
import { useAuthActions } from "@convex-dev/auth/react";
import { useAuthContext } from "../context/AuthContext";
import { onEmailSubmit } from "../utils/utils";
type EmailFormProps = {
  disabled?: boolean;
};
type OnSubmitFunc = {
  onEmailSubmit: OnEmailSubmitType
}

const EmailForm: React.FC<EmailFormProps> = (onSubmitFunc) => {
  /* centralizes form logic */
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors: ValidationErrors },
  } = useFormContext<EmailFormValues>();

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const { authObject, dispatch, signIn } = useAuthContext();

  const disabled = authObject.state === "Submitting";

  return (
    <form
      onSubmit={handleSubmit((data) => onEmailSubmit(dispatch, signIn, data))}
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
              error={ValidationErrors.email?.message}
              {...field}
            />
          )}
        />
              <button type="submit">Send code</button>
        <APIErrorComponent className="mt-2" error={authObject.error} />
      </div>
    </form>
  );
};

export default EmailForm;
