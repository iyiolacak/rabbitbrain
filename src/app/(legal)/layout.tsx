import Navbar from "@/app/(landing-page)/_components/Navbar";
import React from "react";

const PrivacyPolicyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default PrivacyPolicyLayout;
