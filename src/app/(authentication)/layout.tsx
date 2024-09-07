import React from "react";
import SignUpPageOtherHalf from "@auth/sign-up/_components/SignUpPageOtherHalf";
import AuthStageIndicator from "@auth/sign-up/_components/SignUpStageIndicator";
import { AuthProvider } from "@auth/context/AuthContext";

export const metadata: any = {
  title: "rabbitbrain · Create your account",
  description: "Generated by create next app",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <div className="flex w-full h-screen">
        {/* Sign Up Page Half (Image & Form Section) */}
        <div className="w-1/2 p-5">
          <div className="w-full h-full rounded-xl overflow-hidden">
            {" "}
            {/* Added rounding */}
            <SignUpPageOtherHalf />
          </div>
        </div>
        {/* Form Section */}
        <div className="w-1/2 h-full flex items-center justify-center p-6">
          <div className="w-full h-full max-w-md">
              {children}
            <AuthStageIndicator outOf={3} />
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default AuthLayout;
