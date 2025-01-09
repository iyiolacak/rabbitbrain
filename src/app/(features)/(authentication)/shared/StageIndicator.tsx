"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuthContext } from "../context/AuthContext";
import { isStageOnCode } from "../utils/utils";
import { outOf } from "../forms/email/constants";

const AuthStageIndicator = () => {
  const { authObject } = useAuthContext();
  const [stage, setStage] = useState(1);

  // Update stage based on authObject.stage
  useEffect(() => {
    setStage(isStageOnCode(authObject.stage) ? 2 : 1);
  }, [authObject.stage]);

  // Render stage indicators
  return (
    <div className="flex w-full flex-row space-x-2 mb-4">
      {Array.from({ length: outOf }, (_, index) => (
        <div
          key={index}
          className={`flex flex-grow rounded-full ${
            index < stage ? "bg-gray-200" : "bg-gray-200 py-1"
          }`}
        >
          {index < stage && (
            <motion.div
              className="h-full w-full rounded-full bg-primary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.2,
                type: "spring",
                ease: [0, 0.23, 0.43, 0.99],
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default AuthStageIndicator;
