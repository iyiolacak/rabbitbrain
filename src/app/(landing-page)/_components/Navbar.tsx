"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  const navItems = [
    { href: "/challenges", label: "Challenges" },
    { href: "/topics", label: "Topics" },
    { href: "/about", label: "About" },
  ];

  const router = useRouter();
  const handleAuthCTA = (authFlow: "sign-up" | "sign-in") =>
    router.push(`/${authFlow}`);

  return (
    <div className="sticky top-0 z-50 w-full bg-zinc-900/85 backdrop-blur-md shadow-md">
      <div className="max-w-6xl mx-auto pl-4 sm:pl-6 pr-3 lg:px-8">
        <div className="flex items-center justify-between py-1">
          <div className="flex-shrink-0">
            <Logo monochrome="white" textSize="sm" size={"size-6"} />
          </div>

          {/* Hidden on mobile screens */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:bg-zinc-200/20 hover:text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Button
              className="h-7 border-none bg-transparent text-zinc-300 text-xs hover:text-white hover:bg-zinc-200/20 rounded-md transition-colors"
              variant="outline"
              onClick={() => handleAuthCTA("sign-in")}
            >
              Sign In
            </Button>
            <Button
              size="sm"
              className="h-7 text-xs text-black hover:bg-zinc-300 bg-white"
              onClick={() => handleAuthCTA("sign-up")}
            >
              Start Learning
            </Button>
            <Link
              href="https://github.com/iyiolacak/rabbitbrain"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-white transition-colors"
            >
              <FaGithub size={24} />
            </Link>
            <LanguageSwitcher />
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-300 hover:text-white focus:outline-none"
              >
                <Menu width={24} height={24} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="top"
              className="w-full bg-zinc-800/70 border-zinc-900 backdrop-blur-lg p-0"
            >
              <SheetHeader className="p-4 border-b border-zinc-700">
                <SheetTitle className="w-min">
                  <Logo monochrome="white" textSize="sm" size={28} />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col w-full h-full p-4 space-y-4">
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-gray-300 hover:bg-zinc-200/20 hover:text-white px-3 py-1.5 rounded-md text-sm font-medium transition-all"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <Button
                  className="h-7 border-none bg-transparent text-zinc-300 text-sm hover:text-white hover:bg-zinc-200/20 rounded-md transition-colors"
                  variant="outline"
                  onClick={() => handleAuthCTA("sign-in")}
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  className="h-10 text-sm text-black hover:bg-zinc-300 bg-white"
                  onClick={() => handleAuthCTA("sign-up")}
                >
                  Start Learning
                </Button>
                <div className="flex justify-between items-center mt-auto">
                  <Link
                    href="https://github.com/iyiolacak/rabbitbrain"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 hover:text-white transition-colors"
                  >
                    <FaGithub size={24} />
                  </Link>
                  <LanguageSwitcher />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
