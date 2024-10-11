"use client";
import React, { useEffect, useRef } from "react";
import { Controller } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuthContext } from "@auth/context/AuthContext";
import ErrorDisplay from "@auth/components/ErrorDisplay";
import { AuthState } from "@auth/hooks/useAuthStatus";

//
// TODO: The OTP input validation schema will be handled better.
//
const OTPForm = () => {
  const { onOTPFormSubmit, OTPFormMethods, authState, authServerError } =
    useAuthContext();
  console.log(authState === AuthState.Success); // Check this before the return statement

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = OTPFormMethods;

  const [showError, setShowError] = React.useState(false);

  const OTPInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    OTPInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (authState !== AuthState.Submitting) {
      OTPInputRef.current?.focus();
    }
  }, [authState]);
  const formRef = useRef<HTMLFormElement>(null);
  console.log(authState === AuthState.Success); // Check this before the return statement

  return (
    <form ref={formRef} onSubmit={handleSubmit(onOTPFormSubmit)}>
      <div className={`flex items-center justify-center`}>
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
              onComplete={handleSubmit(onOTPFormSubmit)}
              ref={OTPInputRef}
              // onSubmit={handleOTPComplete}
              disabled={authState === AuthState.Submitting}
            >
              <InputOTPGroup>
                {[0, 1, 2].map((index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    shake={!!authServerError}
                    error={!!authServerError}
                    data-testid={`otp-slot-${index}`} // Add this line
                  />
                ))}
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                {[3, 4, 5].map((index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    shake={!!authServerError}
                    error={!!authServerError}
                    data-testid={`otp-slot-${index}`} // Add this line
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          )}
        />
      </div>
      <div className="min-h-10">
        {(errors.OTPCode?.message || authServerError) && (
          <ErrorDisplay
            alertIcon={false}
            className="flex justify-center"
            errors={errors.OTPCode?.message || authServerError}
          />
        )}
      </div>
    </form>
  );
};

export default OTPForm;
