"use client";

import React, { useState, useEffect } from "react";
import LoadingCircle from "../shared/LoadingCircle";
import { SendDiagonalSolid, TimerSolid } from "iconoir-react";
import { useAuthContext } from "../context/AuthContext";
import { AuthObject } from "../types";
import { useEmailSubmit } from "../hooks/useEmailSubmit";

const RESEND_COOLDOWN_SECONDS = 30; // Adjust the cooldown duration as needed

const ResendCode: React.FC = () => {
  const { authObject, dispatch, signIn } = useAuthContext();
  const { submitEmail } = useEmailSubmit({ dispatch, signIn });
  const [cooldown, setCooldown] = useState<number>(0); // Add type for state

  const resendEmailCode = (authObject: AuthObject) => {
    if (authObject.stage !== "signIn") {
      submitEmail(authObject.stage);
    } else {
      return "I throw you a big error because we don't know where we left your email address at, so we can't resend.";
    }
  };
  const handleResendCode = async () => {
    if (cooldown > 0) return;

    try {
      await resendEmailCode(authObject);
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (error) {
      console.error("Failed to resend code:", error);
      // Optionally handle error display here
    }
  };

  useEffect(() => {
    let intervalId: number | undefined; // Explicitly declare the type of intervalId

    if (cooldown > 0) {
      intervalId = window.setInterval(() => {
        setCooldown((prevCooldown) => prevCooldown - 1);
      }, 1000);
    }

    // Cleanup function
    return () => {
      if (intervalId !== undefined) clearInterval(intervalId);
    };
  }, [cooldown]);

  return (
    <span
      className={`ml-0.5 rounded-lg p-1 font-medium text-primary inline-block transition-all ${
        cooldown > 0 || authObject
          ? "cursor-not-allowed opacity-70"
          : "cursor-pointer"
      }`}
      onClick={handleResendCode}
    >
      {cooldown > 0 ? (
        <div className="flex items-center">
          Send a new code&nbsp;
          <div className="opacity-100 flex p-1 bg-neutral-200 rounded-lg text-neutral-800 text-sm">
            {cooldown}
            <TimerSolid className="ml-1 text-xs" />
          </div>
        </div>
      ) : isResendingCode ? (
        <div className="flex items-center text-md text-start">
          <LoadingCircle color="#222222" size={20} />
          <div className="flex items-center">
            Send a new code&nbsp;
            <SendDiagonalSolid className="text-primary text-xs" />
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          Send a new code&nbsp;
          <SendDiagonalSolid className="text-primary text-xs" />
        </div>
      )}
    </span>
  );
};

export default ResendCode;
