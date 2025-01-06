"use client";
import Logo from "@/components/Logo";
import React, { useEffect } from "react";
import SectionHeader from "../../shared/SectionHeader";
import Divider from "../../shared/Divider";
import TermsText from "../../shared/TermsText";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import EmailForm from "../../shared/EmailForm";
import { useAuthContext } from "../../context/AuthContext";
import OAuthSignInButton from "../../oauth/OAuthSignInButton";

function RedirectToCreateAccount() {
  return (
    <div>
      <p className="flex flex-wrap w-full justify-center text-sm mt-5">
        Don&apos;t have an account yet?&nbsp;
        <Link href={"/sign-up"}>
          <button className="pl-0.5 text-primary hover:underline inline-flex">
            Create an account <ArrowUpRight size={16} />
          </button>
        </Link>
      </p>
    </div>
  );
}

const SignInPage = () => {

  const { authObject } = useAuthContext();
  return (
    <div className="flex items-center w-content flex-col h-content px-4 py-3">
      <Logo
        size={"size-8"}
        className="flex h-min mb-16 w-content"
        textSize="text-2xl"
      />
      <div className="flex flex-col justify-center items-center">
        <SectionHeader
          title="Jump back in."
          subtitle={
            <>
              Let&apos;s keep the momentum going!
              <span className="pt-2 text-neutral-500">
                —don&apos;t let those neurons get lazy!
              </span>
            </>
          }
        />

        <div className="my-3 grid w-full grid-cols-1 gap-x-2 gap-y-3">
          <OAuthSignInButton
            strategy="oauth_google"
            className="border bg-white font-semibold"
            disabled={authObject.state === "Submitting"}
          />
        </div>
        <Divider />
        <EmailForm />
        <RedirectToCreateAccount />
      </div>
      <TermsText />
    </div>
  );
};

export default SignInPage;
