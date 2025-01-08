"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AuthStage } from "../types";
import { useAuthContext } from "../context/AuthContext";

const AuthStageIndicator = () => {
  const outOf: number = 2;
  const { authObject } = useAuthContext();
  const [stage, setStage] = useState<number>(1);

  useEffect(() => {
    if (authObject.stage === "signIn") {
      setStage(1);
    } else if (
      isEmailSubmitted
    ) {
      setStage(2);
    } else {
      setStage(1);
    }
  }, [authObject.stage]);

  const filledStages = useMemo(() => {
    return Array.from({ length: stage }, (_, index) => (
      <div
        key={index}
        className="flex h-2 md:h-2.5 flex-grow rounded-full bg-gray-200"
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
