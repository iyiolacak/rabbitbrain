"use client";

import React, { useEffect, useRef } from "react";
import { Controller } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuthContext } from "../context/AuthContext";
import APIErrorComponent from "../shared/ErrorDisplay";

// TODO: The OTP input validation schema will be handled better.

const CodeForm = () => {
  const { CodeFormMethods, authObject } = useAuthContext();

  const {
    handleSubmit,
    control,
    formState: { errors: ValidationErrors },
  } = CodeFormMethods;

  const OTPInputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (authObject.state !== "Submitting") {
      OTPInputRef.current?.focus();
    }
  }, [authObject.state]);

  // IMPLEMENT LOGIC!!!
  const onCodeSubmit = () => {};

  const apiError = authObject.error;

  return (
    <form ref={formRef} onSubmit={handleSubmit(onCodeSubmit)}>
      <div className="flex items-center justify-center">
        <Controller
          name="OTPCode"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <InputOTP
              id="otp"
              maxLength={6}
              value={value}
              onChange={onChange}
              onComplete={handleSubmit(onCodeSubmit)}
              ref={OTPInputRef}
              disabled={authObject.state === "Submitting"}
            >
              <InputOTPGroup>
                {[0, 1, 2].map((index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    shake={!!apiError}
                    error={!!apiError}
                    data-testid={`otp-slot-${index}`}
                  />
                ))}
              </InputOTPGroup>
              <InputOTPSeparator className="hidden md:block" />
              <InputOTPGroup>
                {[3, 4, 5].map((index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    shake={!!apiError}
                    error={!!apiError}
                    data-testid={`otp-slot-${index}`}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          )}
        />
      </div>
      <div className="min-h-10 flex items-center justify-center">
        {apiError && (
          <APIErrorComponent
            alertIcon={false}
            className="flex justify-center"
            error={apiError}
          />
        )}
      </div>
    </form>
  );
};

export default CodeForm;
