"use client";

import { Button } from "@/components/ui/button";
import { useSignUp } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";
import React from "react";
import { oauthMapping } from "./oauthMapping";
import { useAuthContext } from "@/app/_features/_authentication/context/AuthContext";
import ErrorDisplay from "@/app/_features/_authentication/shared/ErrorDisplay";
import { AuthState, useAuthStatus } from "@/app/_features/_authentication/hooks/useAuthStatus";
import LoadingCircle from "../shared/LoadingCircle";
import useOAuthHandler from "@/app/features/authentication/hooks/useOAuthHandler";

type OAuthButtonProps = {
  strategy: OAuthStrategy;
  className?: string;
  disabled?: boolean;
};

const OAuthSignInButton: React.FC<OAuthButtonProps> = ({
  className,
  strategy,
  disabled,
}) => {
  const mapping = oauthMapping[strategy];
  const { oauthServerError, authState } = useAuthStatus();
  const handleOAuthClick = useOAuthHandler();

  return (
    <>
      <Button
        variant="secondary"
        className={`${className} `}
        size={"lg"}
        onClick={() => handleOAuthClick(strategy)}
        disabled={disabled}
      >
        {authState === AuthState.Submitting ?
        <LoadingCircle color="#000" /> :
        `Continue with ${mapping?.name}`
        }
      </Button>
      {oauthServerError && <ErrorDisplay errors={oauthServerError} />}
    </>
  );
};

export default OAuthSignInButton;
