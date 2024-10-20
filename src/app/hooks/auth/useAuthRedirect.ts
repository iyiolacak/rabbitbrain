"use client";
import { useEffect } from "react";
import useNavigation from "@/app/hooks/useNavigation";
import { UserResource } from "@clerk/types";

const ROUTES = {
  home: "/home",
  signIn: "/sign-in",
  signUp: "/sign-up",
};

type AuthRedirectParams = {
  isLoaded: boolean;
  user: UserResource | null | undefined;
};

export const useAuthRedirect = ({ isLoaded, user }: AuthRedirectParams) => {
  const { navigateTo } = useNavigation();

  useEffect(() => {
    if (isLoaded && user) {
      navigateTo(ROUTES.home);
    }
  }, [isLoaded, user, navigateTo]);
};
