"use client";

import { EmailForm } from "@/app/features/authentication/context/AuthContext";
import { useState } from "react";

const useStoreAuthData = <T>(initialValue?: T) => {
  // An object with email data
  const [authData, setAuthData] = useState<T | undefined>(initialValue);
  return {
    authData,
    setAuthData,
  };
};
1
export default useStoreAuthData;
