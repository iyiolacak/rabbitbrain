"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";
import { AuthState } from "../../hooks/useAuthStatus";
import EmailFormComponent from "./EmailFormComponent";
import OAuthSignInButton from "../_components/OAuthSignInButton";
import LegalTOSText from "../_components/LegalTOSText";
import Logo from "@/components/Logo";
import Divider from "../_components/Divider";
import SectionHeader from "../_components/SectionHeader";

const RedirectToSignIn = () => (
  <p className="flex flex-wrap w-full justify-center text-sm mt-5">
    Have an account?&nbsp;
    <Link href="/sign-in" className="text-primary hover:underline inline-flex items-center">
      Sign in to your account <ArrowUpRight size={16} className="ml-1" />
    </Link>
  </p>
);

const SignUp = () => {
  const { authState } = useAuthContext();

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto px-4 py-8">
      <Logo
        size="size-8"
        className="mb-16"
        textSize="text-2xl"
      />
      <div className="w-full">
        <SectionHeader
          title="Hop Into Rabbitbrain."
          subtitle={
            <>
              Quick, easy, and free—hop right in!
              <span className="block mt-2 text-neutral-500">
                Brain training designed to keep you coming back.
              </span>
            </>
          }
        />
        <div className="my-6">
          <OAuthSignInButton
            strategy="oauth_google"
            className="w-full border bg-white font-semibold"
            disabled={authState === AuthState.Submitting}
          />
        </div>
        <Divider />
        <EmailFormComponent authAction="sign-up" />
        <RedirectToSignIn />
      </div>
      <LegalTOSText/>
    </div>
  );
};

export default SignUp;