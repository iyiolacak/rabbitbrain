"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useAuthContext } from "@auth/context/AuthContext";
import { AuthStage } from "@auth/hooks/useAuthStatus";

const AuthStageIndicator = ({ outOf }: { outOf: number }) => {
  const { authStage } = useAuthContext();
  const [stage, setStage] = useState<number>(1);

  useEffect(() => {
    switch(authStage) {
      case(AuthStage.Verifying):
        setStage(prev => Math.max(prev, 2));  // Move to stage 2 if not already there
        break;
      default:
        setStage(1);
    }
  }, [authStage]);

  const filledStages = useMemo(() => {
    return Array.from({ length: stage }, (_, index) => (
      <div
        key={index}
        className="flex h-2 flex-grow rounded-full bg-gray-200"
      >
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
      <div className="flex w-full flex-row space-x-2 mb-4">
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
