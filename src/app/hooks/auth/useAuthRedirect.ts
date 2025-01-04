"use client";
import { useEffect } from "react";
import useNavigation from "@/app/hooks/useNavigation";
import { UserResource } from "@clerk/types";

const ROUTES = {
  home: "/home",
  signIn: "/sign-in",
};

type AuthRedirectParams = {
  user: UserResource | null | undefined;
};

export const useAuthRedirect = ({ user }: AuthRedirectParams) => {
  const { navigateTo } = useNavigation();

  useEffect(() => {
    if (user) {
      navigateTo(ROUTES.home);
    }
  }, [user, navigateTo]);
};
