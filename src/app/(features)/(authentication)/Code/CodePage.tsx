"use client";
import CodeForm from "./CodeForm";
import { useHandleBack } from "@/app/hooks/auth/useHandleBackNavigation";
import ResendCode from "./ResendOTPCode";
import { EditPencil } from "iconoir-react";
import { useAuthContext } from "../context/AuthContext";
interface CodePageProps {
  onSubmit: () => void;
}
const CodePage: React.FC<CodePageProps> = (onSubmit) => {
  const { authObject, dispatch } = useAuthContext();
  const didSomethingWentWrong = !authObject || !authObject.stage || authObject.stage === "signIn";

  return (
    <div className="flex min-h-full w-full px-4 max-w-md mx-auto">
      <div className="flex w-full flex-col items-center justify-center mb-24">
        <div className=" text-center w-full">
          <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-tight transition-colors first:mt-0">
            We&apos;ve just sent you an email.
          </h2>
          <h3 className="scroll-m-20 text-sm md:text-base font-normal tracking-tight py-5">
            Enter the security code we sent to&nbsp;
            <span
              onClick={() => {
                dispatch({ type: "auth_reset" });
              }}
              className="inline-flex cursor-pointer items-center rounded-md px-1 font-regular text-blue-700 transition-colors break-all"
            >
              {authObject.stage != "signIn"
                ? authObject.stage.toString()
                : "Something went wrong"}
              <EditPencil className="ml-0.5 flex-shrink-0 text-xs" />
            </span>
          </h3>
        </div>
        <CodeForm />
        <div className="mt-10 text-center w-full">
          <h3 className="text-sm md:text-base font-normal tracking-tight">
            Need another code? <ResendCode />
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CodePage;
