"use client";

// External libraries
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavArrowLeft } from "iconoir-react";
import { useUser } from "@clerk/clerk-react";

// UI components
import { Button } from "@/components/ui/button";

// Auth-related components and hooks
import { useAuthContext } from "@/app/_features/_authentication/context/AuthContext";

// Custom hooks
import { useHandleBack } from "@/app/hooks/auth/useHandleBackNavigation";
import { useAuthRedirect } from "@/app/hooks/auth/useAuthRedirect";
import SignInPage from "./_components/SignInPage";
import CodePage from "../sign-up/verify-email/_components/OTP";
import AuthCompleted from "../shared/AuthCompleted";
import EmailForm from "../shared/EmailForm";
import { transitionVariants } from "../forms/email/constants";


const SignUpPage = () => {

  const transitionSettings = useMemo(
    () => ({
      duration: 0.2,
      ease: [0.05, 0.66, 0.32, 0.92],
    }),
    []
  );

  const { authStatus } = useAuthContext();

  const renderStageContent = useMemo(() => {
        return authStatus.stage === "signIn" ? (
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
        ) :
        (
          <motion.div
          key="verifying"
          initial="initial"
          animate="animate"
          exit="exit"
            variants={transitionVariants}
            transition={transitionSettings}
            className="h-full"
          >
            {/* <Button onClick={} variant="ghost">
              <NavArrowLeft />
            </Button> */}
            <VerifyEmail />
          </motion.div>
        );
        (
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
    }
  }, [authStage, transitionSettings]);

  return (
    <div className="h-full flex justify-center items-center">
      <AnimatePresence mode="wait" initial={false}>
        {renderStageContent}
      </AnimatePresence>
    </div>
  );
};

export default SignUpPage;
