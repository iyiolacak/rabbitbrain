"use client";

// External libraries
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavArrowLeft } from "iconoir-react";
import { useUser } from "@clerk/clerk-react";

// UI components
import { Button } from "@/components/ui/button";

// Auth-related components and hooks

// Custom hooks
import { useHandleBack } from "@/app/hooks/auth/useHandleBackNavigation";
import { useAuthRedirect } from "@/app/hooks/auth/useAuthRedirect";
import SignInPage from "./_components/SignInPage";
import AuthCompleted from "../shared/AuthCompleted";
import EmailForm from "../shared/EmailForm";
import { transitionVariants } from "../forms/email/constants";
import CodePage from "../Code/CodePage";
import { useAuthContext } from "../context/AuthContext";


const SignUpPage = () => {

  const transitionSettings = useMemo(
    () => ({
      duration: 0.2,
      ease: [0.05, 0.66, 0.32, 0.92],
    }),
    []
  );

  const { authObject } = useAuthContext();

/**
 * SignInForm and CodeForm are derived from your zod schemas, e.g.:
 * 
 *   type SignInForm = { email: string };
 *   type CodeForm   = { code: string; email: string };
 */
  
  const renderStageContent = useMemo(() => {
        return authObject.stage === "signIn" ? (
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
            <CodePage />
          </motion.div>
        );
    })
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
