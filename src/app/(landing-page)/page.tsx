"use client";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";

const LandingPage = () => {
  const router = useRouter();
  const handleSignUpCTA = () => router.push("/sign-up");

  return (
    <div className="min-h-screen bg-black">
      {/* First Section - Hero */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image with Framer Motion */}
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
          className="absolute inset-0 z-0"
        >
          {/* Desktop Image */}
          <div className="hidden sm:block relative w-full h-full">
            <Image
              src="/brain-surrounded-by-rabbits-renaissance-style.webp"
              alt="Rabbits and Brain"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              quality={100}
              priority
            />
          </div>
          {/* Mobile Image */}
          <div className="sm:hidden relative w-full h-full">
            <Image
              src="/brain-surrounded-by-rabbits-mobile.webp"
              alt="Rabbits and Brain (Mobile)"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              quality={100}
              priority
            />
          </div>
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-between items-center h-full text-center px-4 py-16">
          <h1 className="text-white text-5xl drop-shadow-2xl font-serif font-semibold mt-6 leading-tight">
            Start Training Your Brain Today.
          </h1>
          <Button
            onClick={handleSignUpCTA}
            className="text-black bg-white px-8 py-4 text-md tracking-tight rounded-full hover:bg-neutral-300 mb-20"
          >
            Hop In Now—It&apos;s Free!
          </Button>
        </div>
      </section>

      {/* Second Section */}
      <section className="bg-white py-24 px-6 md:px-12">
        <div className="max-w-2xl lg:max-w-5xl mx-auto">
          <h2 className="text-black text-2xl md:text-4xl block font-medium text-center mb-8">
            Rabbitbrain is a free,{" "}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="inline hover:text-blue-600 align-baseline transition-colors cursor-pointer items-center"
              href="https://github.com/iyiolacak/rabbitbrain"
            >
              <FaGithub className="mr-1 inline" size={32} />
              open-source
            </Link>
            &nbsp;platform
            <span className="text-zinc-400">
              &nbsp;where you train your mind with <span>AI-generated</span> and
              &nbsp;
              <span
                className="hover:text-green-500 transition-colors cursor-pointer"
                onClick={() => {}}
              >
                community-created
              </span>
              &nbsp;challenges. No paywalls, no limits—just smarter thinking,
              one challenge at a time.
            </span>
          </h2>
          {/* Additional content can go here */}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-orange-600 py-16 text-center">
        <h2 className="text-white font-serif text-3xl md:text-4xl font-medium mb-6">
          Ready to Create Your Own Challenge?
        </h2>
        <p className="text-white text-lg mb-8">
          Join the community and start building your own brain-busting
          challenges.
        </p>
        <Button
          onClick={handleSignUpCTA}
          className="bg-white text-orange-600 font-playful font-semibold px-8 py-4 text-md tracking-tight rounded-full hover:bg-neutral-300"
        >
          Get Started Now
        </Button>
      </section>
    </div>
  );
};

export default LandingPage;