"use client";

import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import APIErrorComponent from "./ErrorDisplay";
import AnimatedInput from "./AnimatedInput";
import { EmailForm as EmailFormValues, SignInForm } from "../types";
import { useAuthContext } from "../context/AuthContext";
import { useEmailSubmit } from "../hooks/useEmailSubmit";
import { Button } from "@/components/ui/button";
type EmailFormProps = {
  disabled?: boolean;
};

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

  const { submitEmail } = useEmailSubmit({
    dispatch,
    signIn,
  });

  const disabled = authObject.state === "Submitting";

  return (
    <form
      onSubmit={handleSubmit((data: SignInForm) => {
        
        submitEmail({ ...data });
      })}
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
              autoComplete="email"
              prompt="Enter your email"
              placeholder="example@example.com"
              disabled={disabled}
              error={ValidationErrors.email?.message}
              {...field}
            />
          )}
        />
        <Button size="lg" type="submit" disabled={disabled}>
          Send code
        </Button>
        {authObject.error && (
          <APIErrorComponent className="mt-2" error={authObject.error} />
        )}
      </div>
    </form>
  );
};

export default EmailForm;
