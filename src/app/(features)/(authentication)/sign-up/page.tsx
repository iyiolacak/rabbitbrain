"use client";

// External libraries
import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavArrowLeft } from "iconoir-react";

// UI components
import { Button } from "@/components/ui/button";

// Auth-related components and hooks
import SignUpStageForm from "./_components/SignUpForm";
import CodePage from "../Code/CodePage";
import AuthCompleted from "../shared/AuthCompleted";
import { useHandleBack } from "../hooks/useHandleBack";
import { useAuthContext } from "../context/AuthContext";
import { isStageOnCode } from "../utils/utils";
import NavigateBack from "../sign-in/_components/NavigateBack";

// Custom hooks

const transitionVariants = {
  initial: { opacity: 0, x: 150 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -150 },
};

const SignUpPage = () => {
  const { authObject, dispatch } = useAuthContext();

  const handleBack = useHandleBack(dispatch);

  const transitionSettings = useMemo(
    () => ({
      duration: 0.2,
      ease: [0.05, 0.66, 0.32, 0.92],
    }),
    []
  );

  const displayCurrentStage = useMemo(() => {
    switch (true) {
      case authObject.stage === "signIn":
        return (
          <motion.div
            key="form"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={transitionVariants}
            transition={transitionSettings}
            className="h-full"
          >
            <SignUpStageForm />
          </motion.div>
        );
      case isStageOnCode(authObject.stage):
        return (
          <motion.div
            key="verifying"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={transitionVariants}
            transition={transitionSettings}
            className="h-full"
          >
            <NavigateBack handleBack={handleBack} />
            <CodePage />
          </motion.div>
        );
      default:
        return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authObject.stage, handleBack]);

  return (
    <div className="h-full min-w-3xl flex justify-center items-center">
      <AnimatePresence mode="wait" initial={false}>
        {displayCurrentStage}
      </AnimatePresence>
    </div>
  );
};

export default SignUpPage;
