"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AuthAction,
} from "@/app/(authentication)/context/AuthContext";
import { useAuthStatus } from "@/app/(authentication)/hooks/useAuthStatus";

const useAuthAction = () => {

  const { resetAuth } = useAuthStatus();
  const router = useRouter();
  const { pathname } = router;

  const handleAuthActionFallback = () => {
    resetAuth();
    router.push("sign-in")
    setAuthAction("sign-in")
    return;
  }

  // type AuthAction = "sign-up" | "sign-in" | "reset-password"cc 
  const [authAction, setAuthAction] = useState<AuthAction | null>(null);
  useEffect(() => {
    if (!authAction) {
      handleInvalidToDefaultAuthAction();
    };
    if else (pathname)
  });
};

export default useAuthAction;
