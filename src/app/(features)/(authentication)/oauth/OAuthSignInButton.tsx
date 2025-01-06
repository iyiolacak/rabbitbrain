"use client";

import { Button } from "@/components/ui/button";
import { useSignUp } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";
import React from "react";
import { oauthMapping } from "./oauthMapping";
import LoadingCircle from "../shared/LoadingCircle";
import useOAuthHandler from "@/app/features/authentication/hooks/useOAuthHandler";
import { useAuthContext } from "../context/AuthContext";
import APIErrorComponent from "../shared/ErrorDisplay";

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
  const { authObject } = useAuthContext();
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
        {authObject.state === "Submitting" ?
        <LoadingCircle color="#000" /> :
        `Continue with ${mapping?.name}`
        }
      </Button>
      {oauthServerError && <APIErrorComponent errors={oauthServerError} />}
    </>
  );
};

export default OAuthSignInButton;
