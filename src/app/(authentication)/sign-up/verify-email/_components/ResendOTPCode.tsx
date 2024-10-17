"use client";

import React, { useState, useEffect } from "react";
import { useAuthContext } from "@auth/context/AuthContext";
import LoadingCircle from "../../_components/LoadingCircle";

const RESEND_COOLDOWN_SECONDS = 30; // Adjust the cooldown duration as needed

const ResendCode: React.FC = () => {
  const { resendEmailCode, isResendingCode } = useAuthContext();
  const [cooldown, setCooldown] = useState<number>(0); // Add type for state

  const handleResendCode = async () => {
    if (cooldown > 0 || isResendingCode) return;

    try {
      await resendEmailCode();
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
      className={`ml-0.5 rounded-lg p-1 font-medium text-primary hover:bg-primary/10 inline-block transition-all ${
        cooldown > 0 || isResendingCode
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer"
      }`}
      onClick={handleResendCode}
    >
      {cooldown > 0 ? (
        `Send a new code in ${cooldown}s`
      ) : isResendingCode ? (
        <div className="flex items-center text-md text-start">
          <LoadingCircle color="#222222" size={20} />
          Send a new code
        </div>
      ) : (
        "Send a new code"
      )}
    </span>
  );
};

export default ResendCode;
