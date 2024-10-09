"use client";
import React from "react";
import EmailFormComponent from "./EmailFormComponent";
import OAuthSignInButton from "../_components/OAuthSignInButton";
import LegalTOSText from "../_components/LegalTOSText";
import Logo from "@/components/Logo"; // src/components/Logo.tsx
import Divider from "../_components/Divider";
import SectionHeader from "../_components/SectionHeader";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";
import { AuthState } from "../../hooks/useAuthStatus";

function RedirectToSignIn() {
  return (
    <div>
      <p className="flex flex-wrap w-full justify-center text-sm mt-5">
        Have an account?&nbsp;
        <Link href={"/sign-in"}>
          <button className="pl-0.5 text-primary hover:underline inline-flex">
            Sign in to your account <ArrowUpRight size={16} />
          </button>
        </Link>
      </p>
    </div>
  );
}

const SignUp = () => {
  const { authState } = useAuthContext();
  return (
    <div className="flex flex-col items-center w-content h-content px-4 py-3">
      {/* Added some margin to the logo to avoid overlapping */}
      <Logo
        size={"size-8"}
        className="flex h-min mb-16 w-content"
        textSize="text-2xl"
      />
      <div className="flex flex-col h-full justify-center items-center">
        <SectionHeader
          title="Hop Into Rabbitbrain."
          subtitle={
            <>
              Quick, easy, and free—hop right in!
              <span className="pt-2 text-neutral-500">
                &nbsp;Brain training designed to keep you coming back.
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
        <RedirectToSignIn />
      </div>

      <LegalTOSText />
    </div>
  );
};

export default SignUp;
