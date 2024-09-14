"use client";
import { motion } from "framer-motion";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const ChallengesPage = () => {
  const router = useRouter();
  const handleSignUpCTA = () => router.push("/sign-up");

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-screen">
        <motion.div
          initial={{
            scale: 1.5,
            opacity: 0,
            clipPath: "circle(0% at 50% 50%)",
          }}
          animate={{
            scale: 1,
            opacity: 1,
            clipPath: "circle(150% at 50% 50%)",
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 z-0 flex justify-center"
        >
          <div className="relative w-full h-full max-w-5xl mx-auto">
            {/* Orange fade effect from all edges */}
            <div className="absolute inset-0 bg-gradient-to-b from-orange-600 via-transparent to-black"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
          </div>
        </motion.div>

        {/* Hero Content */}
        <section className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 py-16">
          <h1 className="text-white text-5xl font-serif font-semibold leading-tight">
            Take on a Challenge
          </h1>
          <p className="text-white text-xl mt-4 mb-8">
            AI-generated and community-created challenges to sharpen your mind.
          </p>
          {/* CTA Button */}
          <Button
            onClick={handleSignUpCTA}
            className="text-black bg-white px-8 py-4 text-md tracking-tight rounded-full hover:bg-neutral-300"
          >
            Start Your Challenge
          </Button>
        </section>
        </div>
    </div>
  );
};

export default ChallengesPage;
