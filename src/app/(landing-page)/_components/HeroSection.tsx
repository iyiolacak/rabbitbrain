import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import React from "react";
import HeroBackgroundImage from "./HeroBackgroundImage";
import useNavigation from "@/app/hooks/useNavigation";

const HeroTitle = ({ titles }: { titles: string[][] }) => {
  return (
    <div>
      {titles.map((lineWords, index) => (
        <div className="block" key={index}>
          {lineWords.map((word: string, idx: number) => (
            <motion.span key={idx} className="text-white font-sans">
              {word}&nbsp;
            </motion.span>
          ))}
          <br />
        </div>
      ))}
    </div>
  );
};

const HeroSection = () => {
  const heroTitle: string[] = ["AI-Powered Challenges,", "Built by You"];
  const heroTitleWords: string[][] = heroTitle.map((line) => line.split(" "));
  // ^[["this", "is", "how"], ["it", "is", "mapped"]]

  const { navigateTo } = useNavigation();
  return (
    <section className="relative h-screen overflow-hidden">
      <HeroBackgroundImage />
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-between items-center h-full text-center px-4 py-16">
        <div className="relative inline-block">
          <h1 className="relative text-primary md:text-zinc-400 text-2xl sm:text-5xl xl:text-6xl font-serif font-semibold mt-6 leading-none lg:max-w-4xl ">
            Mastermind Playground
            <br />
            <HeroTitle titles={heroTitleWords} />
          </h1>
        </div>
        <Button
          onClick={() => navigateTo("/sign-up")}
          className="text-black backdrop-brightness-75 bg-white px-8 py-4 text-md tracking-tight rounded-full hover:bg-neutral-300 mb-20"
        >
          Hop In Now—It&apos;s Free!
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
