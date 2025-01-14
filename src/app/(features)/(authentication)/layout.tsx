import React from "react";
import { Metadata } from "next";
import { AuthProvider } from "./context/AuthContext";
import AuthStageIndicator from "./shared/StageIndicator";
import AuthImageSection from "./shared/AuthImageSection";

export const metadata: Metadata = {
  title: "rabbitbrain · Create your account",
  description: "Quick, easy, and free—hop right in. Brain training designed to keep you coming back.",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <div className="flex w-full h-screen">
        {/* Sign Up Page Half (Image & Form Section) */}
        <div className="w-1/2 md:p-5 md:block hidden">
          <div className="w-full h-full rounded-xl overflow-hidden">
            <AuthImageSection />
          </div>
        </div>
        {/* Form Section */}
        <div className="w-full px-1 md:w-1/2 h-full flex items-center justify-center relative md:pt-6 md:pb-1 overflow-hidden">
          <div className="flex flex-col h-full w-full max-w-md relative">
            <div className="flex-grow">{children}</div>
            <div className="max-w-full">
              <AuthStageIndicator />
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default AuthLayout;
