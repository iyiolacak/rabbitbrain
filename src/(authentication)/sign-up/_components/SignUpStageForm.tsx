"use client";
import React from "react";
import EmailFormComponent from "./EmailFormComponent";
import OAuthSignInButton from "../_components/OAuthSignInButton";
import LegalTOSText from "../_components/LegalTOSText";
import Logo from "@/components/Logo"; // src/components/Logo.tsx
import Divider from "../_components/Divider";
import SectionHeader from "../_components/SectionHeader";
import { useAuthStatus, AuthState } from "@auth/hooks/useAuthStatus";
import Link from 'next/link';
import { ArrowUpRight } from "lucide-react";

function RedirectToSignIn() {
  return (
    <div className="mt-5">
      <p className="flex flex-row text-sm">
        You have an account?&nbsp;
        <Link href={"/sign-in"}>
        <button className="text-primary hover:underline flex flex-row px-0.5">
          Sign in to your account <ArrowUpRight size={16} />
        </button>
        </Link>
      </p>
    </div>
  );
}

const SignUp = () => {
  const { authState } = useAuthStatus();
  return (
    <div className="flex w-full flex-col items-center px-4 py-3">
      <Logo size={48} className="flex items-center py-3" />
      <SectionHeader
        title="Create your Einv account."
        subtitle={
          <>
            Sign up in seconds, it&apos;s fast and free.&nbsp;
            <span className="pt-2 text-neutral-500">
              No contract required. Hassle-free inventory management.
            </span>
          </>
        }
      />

      <div className="my-3 grid w-full grid-cols-1 gap-x-2 gap-y-3">
        <OAuthSignInButton
          strategy="oauth_google"
          className="border bg-white font-semibold"
          disabled={authState === AuthState.Submitting}
        />
      </div>
      <Divider />
      <EmailFormComponent authAction={"sign-up"} />
      <RedirectToSignIn/>
      <LegalTOSText />
    </div>
  );
};

export default SignUp;
