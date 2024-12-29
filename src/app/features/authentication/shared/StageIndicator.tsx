"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AuthAction, useAuthContext } from "@/app/features/authentication/context/AuthContext";
import { AuthStage } from "@/app/features/authentication/hooks/useAuthStatus";

type AuthStageIndicatorProps = {
  outOf: number;
  authAction: AuthAction;
};

type StageMapping = {
  [AuthAction in "sign-up" | "sign-in" | "forgot-password"]: {
    [key in AuthStage]: number;
  };
};

const AuthStageIndicator = ({ outOf, authAction }: AuthStageIndicatorProps) => {
  const { authStage } = useAuthContext();
  const [stage, setStage] = useState<number>(1);
  'porno'

  useEffect(() => {
    const stageMapping: StageMapping = {
      "sign-up": {
        [AuthStage.Form]: 1,
        [AuthStage.Verifying]: 2,
        [AuthStage.Completed]: 3,
      },
      "sign-in": {
        [AuthStage.Form]: 1,
        [AuthStage.Verifying]: 2,
        [AuthStage.Completed]: 3,
      },
      "forgot-password": {
        [AuthStage.Form]: 1,
        [AuthStage.Verifying]: 2,
        [AuthStage.Completed]: 3,
      },
    } as const;
    const currentStage = stageMapping[authAction]?.[authStage] ?? 1;
    switch (authStage) {
      case AuthStage.Verifying:
        setStage(currentStage || 1);
        break;
      default:
        setStage(1);
    }
  }, [authStage, authAction]);

  const filledStages = useMemo(() => {
    return Array.from({ length: stage }, (_, index) => (
      <div key={index} className="flex h-2 md:h-2.5 flex-grow rounded-full bg-gray-200">
        <motion.div
          className="h-full w-[100%] rounded-full bg-primary"
          initial={{ scaleX: 0 }}
          transition={{
            duration: 0.2,
            type: "spring",
            ease: [0, 0.23, 0.43, 0.99],
          }}
          animate={{ scaleX: 1 }}
        />
      </div>
    ));
  }, [stage]);

  const indicators = useMemo(() => {
    return (
      <div className={`flex w-full flex-row space-x-2 mb-4`}>
        {filledStages}
        {Array.from({ length: outOf - stage }, (_, index) => (
          <div
            key={index}
            className="flex flex-grow rounded-full bg-gray-200 py-1"
          />
        ))}
      </div>
    );
  }, [filledStages, outOf, stage]);

  return indicators;
};

export default AuthStageIndicator;
