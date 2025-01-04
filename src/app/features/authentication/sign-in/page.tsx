"use client";

// External libraries
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavArrowLeft } from "iconoir-react";
import { useUser } from "@clerk/clerk-react";

// UI components
import { Button } from "@/components/ui/button";

// Auth-related components and hooks
import { useAuthContext } from "@/app/features/authentication/context/AuthContext";
import { AuthStage } from "@/app/features/authentication/hooks/useAuthStatus";

// Custom hooks
import { useHandleBack } from "@/app/hooks/auth/useHandleBackNavigation";
import { useAuthRedirect } from "@/app/hooks/auth/useAuthRedirect";
import SignInPage from "./_components/SignInPage";
import VerifyEmail from "../sign-up/verify-email/_components/OTP";
import AuthCompleted from "../shared/AuthCompleted";

const transitionVariants = {
  initial: { opacity: 0, x: 150 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -150 },
};

const SignUpPage = () => {
  // TODO: implement useUser() for 
  const { user } = useUser();

  // Redirect logic if user data is loaded
  useAuthRedirect({ user });

  const handleBack = useHandleBack();
  const { authStage } = useAuthContext();

  const transitionSettings = useMemo(
    () => ({
      duration: 0.2,
      ease: [0.05, 0.66, 0.32, 0.92],
    }),
    []
  );

  const renderStageContent = useMemo(() => {
    switch (authStage) {
      case AuthStage.Verifying:
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
            <SignInPage/>
          </motion.div>
        );
      case AuthStage.Form:
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
            transition={transitionSettings}
            className="h-full"
          >
            <AuthCompleted />
          </motion.div>
        );
      default:
        return null;
    }
  }, [authStage, handleBack, transitionSettings]);

  return (
    <div className="h-full flex justify-center items-center">
      <AnimatePresence mode="wait" initial={false}>
        {renderStageContent}
      </AnimatePresence>
    </div>
  );
};

export default SignUpPage;
