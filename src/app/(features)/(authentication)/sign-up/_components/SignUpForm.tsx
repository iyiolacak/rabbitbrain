"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";
import EmailForm from "../../shared/EmailForm";
import TermsText from "../../shared/TermsText";
import Logo from "@/components/Logo";
import Divider from "../../shared/Divider";
import SectionHeader from "../../shared/SectionHeader";
import OAuthSignInButton from "../../oauth/OAuthSignInButton";

const RedirectToSignIn = () => (
  <p className="flex flex-wrap w-full justify-center text-sm mt-10">
    Have an account?&nbsp;
    <Link
      href="/sign-in"
      className="text-primary hover:underline inline-flex items-center"
    >
      Sign in to your account <ArrowUpRight size={16} className="ml-1" />
    </Link>
  </p>
);

const SignUpForm = () => {
  const { authObject } = useAuthContext();

  return (
    <div className="flex flex-col items-center w-full h-full max-w-md w:min-w-3xl mx-auto px-4 py-3">
      <div className="flex h-full flex-col items-center justify-center mb-10">
        <Logo
          size="size-8 md:size-9"
          className="mb-8"
          textSize="text-2xl"
          textHidden
          monochrome="black"
        />
        <div className="w-full">
          <SectionHeader
            title="Hop Into Rabbitbrain."
            subtitle={
              <>
                Quick, easy, and free—hop right in!&nbsp;
                <span className="text-neutral-500">
                  Brain training designed to keep you coming back.
                </span>
              </>
            }
          />
          <div className="my-8">
            <OAuthSignInButton
              strategy="oauth_google"
              className="w-full border bg-white font-semibold"
              disabled={authObject.state === "Submitting"}
            />
          </div>
          <Divider />
          <EmailForm />
          <RedirectToSignIn />
        </div>
        <TermsText />
      </div>
    </div>
  );
};

export default SignUpForm;
