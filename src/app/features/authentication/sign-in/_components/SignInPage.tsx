"use client";
import Logo from "@/components/Logo";
import React, { useEffect } from "react";
import SectionHeader from "../../shared/SectionHeader";
import OAuthSignInButton from "../../sign-up/_components/OAuthSignInButton";
import Divider from "../../shared/Divider";
import LegalTOSText from "../../shared/LegalTOSText";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import EmailFormComponent from "../../shared/EmailFormComponent";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/clerk-react";
import { AuthState, useAuthStatus } from "../../hooks/useAuthStatus";

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
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/home");
    }
  }, [isLoaded, isSignedIn, router]);

  const { authState } = useAuthStatus();
  return (
    <div className="flex items-center w-content flex-col h-content px-4 py-3">
      <Logo size={"size-8"} className="flex h-min mb-16 w-content" textSize="text-2xl" />
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
            disabled={authState === AuthState.Submitting}
          />
        </div>
        <Divider />
        <EmailFormComponent authAction={"sign-in"} />
        <RedirectToCreateAccount />
      </div>
      <LegalTOSText />
    </div>
  );
};

export default SignInPage;
