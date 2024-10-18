"use client";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { SystemShut } from "iconoir-react";
import React from "react";

const HomeNavbar = () => {
  const { signOut } = useClerk();
  return (
    <header className="w-full border-b h-16">
      {/* Navbar content */}
      <nav className="h-full">
        <div className="container pl-2 pr-4 md:px-12 mx-auto h-full flex justify-between items-center">
          <Logo
            size={"md:size-8 size-7"}
            textSize="md:text-lg text-md"
            monochrome="black"
          />
          <div className="">
            <div className="flex items-center space-x-2">
              <div className="bg-zinc-200 rounded-full size-7"></div>
              <UserButton />
              <Button
                variant={"destructive"}
                className="flex h-6"
                size={"sm"}
                onClick={() => signOut({ redirectUrl: "/" })}
              >
                Sign out &nbsp;
                <SystemShut className="text-xs" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HomeNavbar;
