"use client";
import OTPForm from "./OTPForm";
import { PencilLine } from "lucide-react";
import AuthStageIndicator from "../../_components/SignUpStageIndicator";
import { useAuthContext } from "@auth/context/AuthContext";

const VerifyEmail = () => {
  const { submittedData } = useAuthContext();
  return (
    <div className="flex min-h-full w-full items-center  px-4 max-w-md">
      <div className="flex w-full max-w-md flex-col items-center justify-center">
        <div className="mb-5 text-center">
          <h2 className="mb-5 md:mb-0 font-serif text-3xl md:text-3xl font-bold tracking-tight transition-colors first:mt-0">
            We&apos;ve just sent<br className="md:hidden"/> you an email.
          </h2>
          <h3 className="scroll-m-20 text-[16px] font-normal tracking-tight md:mt-4">
            Enter the security code we sent to
            <span 
            onClick={}
            className="ml-1 inline-flex cursor-pointer items-center justify-start rounded-md px-1 font-regular text-primary hover:bg-primary/10 transition-colors">
              {submittedData?.email}
              <PencilLine className="ml-0.5" size={20} />
            </span>
          </h3>
        </div>
        <OTPForm/>
        <div className="mt-10 text-center">
          <h3 className="text-md font-normal tracking-tight">
            Need another code?
            <span className="ml-0.5 cursor-pointer rounded-lg p-1 font-medium text-primary transition-colors hover:bg-primary/10">
              Send a new code
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
