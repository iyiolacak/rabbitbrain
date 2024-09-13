"use client";
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
  const handleAuthCTA = (authFlow: "sign-up" | "sign-in") => router.push(authFlow);


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
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-xs font-medium transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Button
              size={"sm"}
              variant={"link"}
              className="h-7 text-zinc-300 text-xs hover:text-white transition-colors"
              onClick={() => handleAuthCTA("sign-in")}
            >
              Sign In
            </Button>
            <Button size={"sm"} className="h-7 text-xs" onClick={() => handleAuthCTA("sign-up")}>
              Start Learning
            </Button>
              <Link href={"https://github.com/iyiolacak/rabbitbrain"} target="_blank" rel="noopener noreferrer">
                <FaGithub className="mr-1 items-center text-zinc-300" size={24} />
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
