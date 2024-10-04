"use client";
import React from "react";
import SignUpStageForm from "./_components/SignUpStageForm";
import { useAuthContext } from "@auth/context/AuthContext";
import VerifyEmail from "./verify-email/_components/OTP";
import { motion, AnimatePresence } from "framer-motion";
import { AuthStage } from "@auth/hooks/useAuthStatus";
import AuthCompleted from "./_components/AuthCompleted";
import { Button } from "@/components/ui/button";
import { NavArrowLeft } from "iconoir-react";
import { useHandleBack } from "@/app/hooks/useHandleBackNavigation";
import { useAuthRedirect } from "@/app/hooks/useAuthRedirect";
import { useSignIn, useUser } from "@clerk/clerk-react";

const transitionVariants = {
  initial: { opacity: 1, x: 150 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -150 },
};

const SignUpPage = () => {
  const { isLoaded, user } = useUser();
  useAuthRedirect({ isLoaded, user });
  const handleBack = useHandleBack();
  // useAuthRedirect hook will be used instead.
  // use auth context and get/set authStage - A new hook for this functionality sounds sensible.
  // IMPORTANT TODO: ADD setAuthStage to useAuthContext
  const { authStage } = useAuthContext();

  const transitionCubicBezier = [0.05, 0.66, 0.32, 0.92];
  return (
    <div className="h-full justify-center items-center">
      <AnimatePresence mode="wait" initial={false}>
        {authStage === AuthStage.Form && (
          <motion.div
            key="form"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={transitionVariants}
            transition={{ duration: 0.2, ease: [transitionCubicBezier] }}
            className="h-full"
          >
            <SignUpStageForm />
          </motion.div>
        )}
        {authStage === AuthStage.Verifying && (
          <motion.div
            key="verifying"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={transitionVariants}
            transition={{ duration: 0.2, ease: [transitionCubicBezier] }}
            className="h-full"
          >
            <Button onClick={handleBack} variant={"ghost"}>
              <NavArrowLeft />
            </Button>
            <VerifyEmail />
          </motion.div>
        )}
        {authStage === AuthStage.Completed && (
          <motion.div
            key="completed"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={transitionVariants}
            transition={{ duration: 0.2, ease: [transitionCubicBezier] }}
            className="h-full"
          >
            <AuthCompleted />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignUpPage;
