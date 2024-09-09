import React from "react";
import Navbar from "./_components/Navbar";

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-zinc-800 flex flex-col w-full">
      <Navbar />
      {children}
    </div>
  );
};

export default LandingPageLayout;
