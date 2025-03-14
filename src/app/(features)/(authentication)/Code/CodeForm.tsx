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
import { NormalizedAPIError } from "../types";
import { signIn } from "convex/auth";
import { useCodeSubmit } from "../hooks/useCodeSubmit";
import { normalizeError } from "../utils/utils";

const CodeForm = () => {
  const { CodeFormMethods, authObject, dispatch, signIn } = useAuthContext();

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

  const { onCodeSubmit } = useCodeSubmit({ dispatch, signIn });
  return (
    <form ref={formRef} onSubmit={handleSubmit((code) => onCodeSubmit(code))}>
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
                    shake={!!authObject.error}
                    error={!!authObject.error}
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
                    shake={!!authObject.error}
                    error={!!authObject.error}
                    data-testid={`otp-slot-${index}`}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          )}
        />
      </div>
      <div className="min-h-10 flex items-center justify-center">
        {ValidationErrors.OTPCode && (
          <p className="text-red-600 text-xs">
            ValidationErrors.OTPCode.message
          </p>
        )}
        {authObject.error && (
          <APIErrorComponent
            alertIcon={false}
            className="flex justify-center"
            error={normalizeError(authObject.error)}
          />
        )}
      </div>
    </form>
  );
};

export default CodeForm;
