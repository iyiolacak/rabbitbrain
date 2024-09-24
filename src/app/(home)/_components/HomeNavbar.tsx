import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import React from "react";

const HomeNavbar = () => {
  return (
    <header className="w-full border-b h-16">
      {/* Navbar content */}
      <nav className="h-full">
        <div className="container mx-auto h-full flex justify-between items-center">
          <Logo size={40} textSize="md" />
          <div className="">
            hey {/* you probs wanna style this eventually */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HomeNavbar;
