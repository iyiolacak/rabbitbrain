"use client";
import Logo from "@/app/(dashboard)/dashboard/components/Logo";
import React, { useEffect } from "react";
import SectionHeader from "../../sign-up/_components/SectionHeader";
import OAuthSignInButton from "../../sign-up/_components/OAuthSignInButton";
import Divider from "../../sign-up/_components/Divider";
import LegalTOSText from "../../sign-up/_components/LegalTOSText";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import EmailFormComponent from "../../sign-up/_components/EmailFormComponent";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/clerk-react";

function RedirectToCreateAccount() {
  return (
    <div>
      <p className="flex flex-row text-sm mt-5">
        Don&apos;t have an account yet?&nbsp;
        <Link href={"/sign-up"}>
          <button className="flex flex-row px-0.5 text-primary hover:underline">
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
    if(isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);


  return (
    <div className="flex flex-col items-center px-4 py-3">
      <Logo size={48} className="flex items-center py-3" />
      <SectionHeader
        title="
        Continue where you left off.
        "
        subtitle={
          <>
            Sign in to keep things running smoothly.&nbsp;
            <span className="pt-2 text-neutral-500">
              Your inventory, your way—secure and simple.
            </span>
          </>
        }
      />
      <div className="my-3 grid w-full grid-cols-1 gap-x-2 gap-y-3">
        <OAuthSignInButton
          strategy="oauth_google"
          className="border bg-white font-semibold"
          //   disabled={authState === AuthState.Submitting}
        />
      </div>
      {/* (component) 'Or' divider */}
      <Divider />
      <EmailFormComponent authAction={"sign-in"} />
      <RedirectToCreateAccount /><LegalTOSText />
    </div>
  );
};

export default SignInPage;
