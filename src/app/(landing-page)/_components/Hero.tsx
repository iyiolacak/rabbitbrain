import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const heroTitle = ["AI-Powered Challenges,", "Built by You"];
const heroTitleWords = heroTitle.map((line) => line.split(" "));
const Hero = () => {
  const router = useRouter();
  const handleSignUpCTA = () => router.push("/sign-up");

  return (
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
        <div className="relative inline-block">
          <h1 className="relative text-primary md:text-zinc-400 text-2xl xl:text-6xl font-serif font-semibold mt-6 leading-none lg:max-w-4xl ">
            Mastermind Playground
            <br />{" "}
            <span className="text-white font-sans">
              {heroTitleWords.map((lineWords, index) => (
                <div className="block"  key={index}>
                  {lineWords.map((word, idx) => (
                    <span key={idx}>{word}&nbsp;</span>
                  ))}
                </div>
              ))}
              <br />
            </span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent bg-clip-text"
              initial={{ x: "-150%" }}
              animate={{ x: "150%" }}
              transition={{
                duration: 2,
                ease: "linear",
                repeat: Infinity,
              }}
              style={{
                backgroundImage:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            />
          </h1>
        </div>
        <Button
          onClick={handleSignUpCTA}
          className="text-black backdrop-brightness-75 bg-white px-8 py-4 text-md tracking-tight rounded-full hover:bg-neutral-300 mb-20"
        >
          Hop In Now—It&apos;s Free!
        </Button>
      </div>
    </section>
  );
};

export default Hero;
