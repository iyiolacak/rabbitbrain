"use client";
import OTPForm from "./OTPForm";
import { PencilLine } from "lucide-react";
import AuthStageIndicator from "../../_components/SignUpStageIndicator";
import { useAuthContext } from "@auth/context/AuthContext";
import { useHandleBack } from "@/app/hooks/useHandleBackNavigation";
import { AuthStage } from "@/app/(authentication)/hooks/useAuthStatus";
import ResendCode from "./ResendOTPCode";

const VerifyEmail = () => {
  const { submittedData } = useAuthContext();
  const handleBack = useHandleBack(AuthStage.Verifying);

  return (
    <div className="flex min-h-full w-full px-4 max-w-md mx-auto">
      <div className="flex w-full flex-col items-center justify-center mb-24">
        <div className=" text-center w-full">
          <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-tight transition-colors first:mt-0">
            We&apos;ve just sent you an email.
          </h2>
          <h3 className="scroll-m-20 text-sm md:text-base font-normal tracking-tight py-5">
            Enter the security code we sent to
            <span
              onClick={handleBack}
              className="ml-1 inline-flex cursor-pointer items-center rounded-md px-1 font-regular text-primary hover:bg-primary/10 transition-colors break-all"
            >
              {submittedData?.email}terathefire@hotmail.com
              <PencilLine className="ml-0.5 flex-shrink-0" size={20} />
            </span>
          </h3>
        </div>
        <OTPForm />
        <div className="mt-10 text-center w-full">
          <h3 className="text-sm md:text-base font-normal tracking-tight">
            Need another code?{' '}
            <ResendCode/>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;