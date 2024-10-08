"use client";
import React, { useMemo } from "react";
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
import { useUser } from "@clerk/clerk-react";

const transitionVariants = {
  initial: {opacity: 0, x: 150 },
  animate: {opacity: 1, x: 0 },
  exit: {opacity: 0, x: -150 },
};

const SignUpPage = () => {
  const { isLoaded, user } = useUser();
  useAuthRedirect({ isLoaded, user });
  const handleBack = useHandleBack();
  const { authStage } = useAuthContext();

  const transitionCubicBezier = useMemo(() => [0.05, 0.66, 0.32, 0.92], []);

  const renderStageContent = useMemo(() => {
    switch (authStage) {
      case AuthStage.Form:
        return (
          <motion.div
            key="form"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={transitionVariants}
            transition={{ duration: 0.2, ease: transitionCubicBezier }}
            className="h-full"
          >
            <SignUpStageForm />
          </motion.div>
        );
      case AuthStage.Verifying:
        return (
          <motion.div
            key="verifying"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={transitionVariants}
            transition={{ duration: 0.2, ease: transitionCubicBezier }}
            className="h-full"
          >
            <Button onClick={handleBack} variant="ghost">
              <NavArrowLeft />
            </Button>
            <VerifyEmail />
          </motion.div>
        );
      case AuthStage.Completed:
        return (
          <motion.div
            key="completed"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={transitionVariants}
            transition={{ duration: 0.2, ease: transitionCubicBezier }}
            className="h-full"
          >
            <AuthCompleted />
          </motion.div>
        );
      default:
        return null;
    }
  }, [authStage, handleBack, transitionCubicBezier]);

  return (
    <div className="h-full flex justify-center items-center">
      <AnimatePresence mode="wait" initial={false}>
        {renderStageContent}
      </AnimatePresence>
    </div>
  );
};

export default SignUpPage;
