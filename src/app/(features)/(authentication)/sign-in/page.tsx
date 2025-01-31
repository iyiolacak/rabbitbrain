"use client";

// External libraries
import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavArrowLeft } from "iconoir-react";

// UI components
import { Button } from "@/components/ui/button";

// Auth-related components and hooks

// Custom hooks
import SignInPage from "./_components/SignInPage";
import { transitionVariants } from "../forms/email/constants";
import CodePage from "../Code/CodePage";
import { useAuthContext } from "../context/AuthContext";
import { useCodeSubmit } from "../hooks/useCodeSubmit";

const SignUpPage = () => {
  const transitionSettings = useMemo(
    () => ({
      duration: 0.2,
      ease: [0.05, 0.66, 0.32, 0.92],
    }),
    []
  );

  const { authObject, dispatch, signIn } = useAuthContext();

  const handleGoBack = () => dispatch({ type: "auth_reset" });

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
        <SignInPage />
      </motion.div>
    ) : (
      <motion.div
        key="verifying"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={transitionVariants}
        transition={transitionSettings}
        className="h-full"
      >
        <Button onClick={handleGoBack} variant="ghost">
          <NavArrowLeft />
        </Button>
        <CodePage />
      </motion.div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authObject.stage, transitionSettings]);

  return (
    <div className="h-full flex justify-center items-center">
      <AnimatePresence mode="wait" initial={false}>
        {renderStageContent}
      </AnimatePresence>
    </div>
  );
};

export default SignUpPage;
