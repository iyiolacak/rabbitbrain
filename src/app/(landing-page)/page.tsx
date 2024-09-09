"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const LandingPage = () => {
 const router = useRouter();
 const handleSignUpCTA = () => router.push("/sign-up");
 return (
  <div className="relative w-full h-screen bg-black">
    {/* Background Image for Larger Screens */}
    <div className="absolute inset-0 z-0 hidden sm:flex justify-center">
      <div className="relative w-full h-[80vh] max-w-5xl mx-auto">
        <Image
          src={"/brain-surrounded-by-rabbits-renaissance-style.webp"}
          alt="Rabbits and Brain"
          fill
          objectFit="cover"
          objectPosition="center"
          quality={100}
          priority
          className="z-0"
        />
        {/* Black fade effect from all edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
      </div>
    </div>
    {/* Background Image for 9:16 Mobile Screens */}
    <div className="absolute inset-0 z-0 sm:hidden">
      <Image
        src={"/brain-surrounded-by-rabbits-mobile.webp"}
        alt="Rabbits and Brain (Mobile)"
        fill
        objectFit="cover"
        objectPosition="center"
        quality={100}
        priority
        className="z-0"
      />
      {/* Black fade effect from all edges for mobile */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
    </div>
    {/* Hero Content */}
    <section className="relative z-10 flex flex-col justify-between items-center h-full text-center px-4 py-16">
      <h1 className="text-white text-5xl drop-shadow-2xl font-serif font-semibold mt-6">
        Start Training Your Brain Today.
      </h1>
      {/* CTA Button */}
      <Button
        onClick={handleSignUpCTA}
        className="text-black bg-white px-8 py-4 rounded-md hover:bg-neutral-300 mb-20"
      >
        Sign Up Now
      </Button>
    </section>
  </div>
 );
};

export default LandingPage;