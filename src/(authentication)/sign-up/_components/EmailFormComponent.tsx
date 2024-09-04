"use client";
import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import AnimatedInput from "./AnimatedInput";
import { useRouter } from "next/navigation";
import { CircularLoading } from "respinner";
import {
  AlertCircleIcon,
  Check,
  CircleX,
  Cross,
  MessageCircleQuestionIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthState, useAuthStatus } from "@auth/hooks/useAuthStatus";
import ErrorDisplay from "@auth/components/ErrorDisplay";
import LoadingCircle from "./LoadingCircle";
import {
  useAuthContext,
  AuthContextValue,
  EmailForm,
  AuthAction,
} from "@auth/context/AuthContext";


interface EmailFormProps {
  authAction: AuthAction;
}

const EmailFormComponent: React.FC<EmailFormProps> = ({ authAction }) => {
  const { authState, authServerError } = useAuthContext();
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useFormContext<EmailForm>();
  const { onEmailFormSubmit }: AuthContextValue = useAuthContext();
  // Focus on the email input field when the component mounts

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  return (
    <div className="min-w-full flex-col">
      <form onSubmit={handleSubmit((data) => {
        onEmailFormSubmit(data, authAction)
      }
      )}>
        <div className="flex flex-col gap-y-4">
          <AnimatedInput
            id="email"
            type="text"
            prompt="Enter your email"
            {...register("email")}
            placeholder="example@example.com"
            disabled={authState === AuthState.Submitting}
            error={errors.email?.message} // Input validation error
          />
          <div>
            <Button
              type="submit"
              disabled={authState === AuthState.Submitting}
              className={cn("w-full bg-primary transition-all", {
                "pulse-once-red": authState === AuthState.Error,
              })}
              size={"lg"}
            >
              {authState === AuthState.Error ? (
                "Continue with email"
              ) : authState === AuthState.Success ? (
                <Check />
              ) : authState === AuthState.Submitting ? (
                <LoadingCircle />
              ) : (
                "Continue with email"
              )}
            </Button>
            <ErrorDisplay className={"mt-2"} errors={authServerError} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmailFormComponent;
