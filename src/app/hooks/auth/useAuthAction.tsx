"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import {
  AuthAction,
  useAuthContext,
} from "@/app/(authentication)/context/AuthContext";
0
const useAuthAction = () => {
  const { resetAuth } = useAuthContext();
  const router = useRouter();

  const [authAction, setAuthAction] = useState<AuthAction | null>(null);

  const setAction = useCallback(
    (action: AuthAction) => {
      resetAuth(); // Resetting authentication before setting action
      setAuthAction(action);
      console.log(action);
    },
    [resetAuth] // Dependencies should include resetAuth to avoid stale closures
  );

  const handleFallback = useCallback(() => {
    // Handles any unknown routes by defaulting to "sign-in"
    setAction("sign-in");
    router.push("/sign-in");
  }, [setAction, router]);

  useEffect(() => {
    // Dynamic routing logic that sets the corresponding action
    switch (router.pathname) {
      case "/sign-in":
        setAction("sign-in");
        break;
      case "/sign-up":
        setAction("sign-up");
        break;
      case "/reset-password":
        setAction("reset-password");
        break;
      default:
        handleFallback();
    }
  }, [router.pathname, setAction, handleFallback]);

  return { authAction }; // Returning the current authAction state
};

export default useAuthAction;
