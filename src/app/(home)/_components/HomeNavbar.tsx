import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import React from "react";

const HomeNavbar = () => {
  return (
    <div className="w-full bg-zinc-100 py-2">
      {/* Navbar content */}
      <div className="flex items-center justify-center">
        <div className="max-w-6xl">
          <Logo size={30} textSize="sm" />
        </div>
      </div>
    </div>
  );
};

export default HomeNavbar;
