"use client";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  const navItems = [
    { href: "/challenges", label: "Challenges" },
    { href: "/topics", label: "Topics" },
    { href: "/about", label: "About" },
  ];

  const router = useRouter();
  const handleAuthCTA = (authFlow: "sign-up" | "sign-in") =>
    router.push(authFlow);

  return (
    <div className="top-0 z-50 sticky w-full bg-zinc-900/85 backdrop-blur-md shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-1">
          <div className="flex-shrink-0">
            <Logo monochrome="white" textSize="sm" size={28} />
          </div>
          <div className="hidden sm:block"></div>
          <div className="hidden sm:flex items-center space-x-4">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-gray-300 hover:bg-zinc-200/20 hover:text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Button
              className="h-7 border-none bg-transparent text-zinc-300 text-xs hover:text-white hover:bg-zinc-200/20 rounded-md transition-colors"
              variant={"outline"}
              onClick={() => handleAuthCTA("sign-in")}
            >
              Sign In
            </Button>
            <Button
              size={"sm"}
              className="h-7 text-xs text-black hover:bg-zinc-300 bg-white"
              onClick={() => handleAuthCTA("sign-up")}
            >
              Start Learning
            </Button>
            <Link
              href={"https://github.com/iyiolacak/rabbitbrain"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="mr-1 items-center text-zinc-300 hover:text-white transition-colors" size={24} />
            </Link>
            <LanguageSwitcher/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
