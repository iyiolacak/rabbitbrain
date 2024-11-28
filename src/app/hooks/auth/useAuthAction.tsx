"use client";
import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  AuthAction,
} from "@/app/features/authentication/context/AuthContext";
import { useAuthStatus } from "@/app/features/authentication/hooks/useAuthStatus";

const useAuthAction = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { resetAuth } = useAuthStatus();

  const [authAction, setAuthAction] = useState<AuthAction | null>(null);

  const setAction = useCallback(
    (action: AuthAction) => {
      setAuthAction(action);
      console.log(action);
      resetAuth();
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
    switch (pathname) {
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
    console.log("re-rendered dumbass")
  }, [pathname, setAction, handleFallback]);

  return { authAction }; // Returning the current authAction state
};

export default useAuthAction;
