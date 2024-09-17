import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import React from "react";
import HeroBackgroundImage from "./HeroBackgroundImage";
import useNavigation from "@/app/hooks/useNavigation";

const HeroTitle = ({ titles }: { titles: string[][] }) => {
  // Define the variants for the container and words
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1, // Adjust the delay between animations
      },
    },
  };

  const wordVariants = {
    initial: { color: "#808080" }, // Gray color
    animate: { color: "#ffffff" }, // White color
  };

  // Flatten the titles array and include line breaks
  const wordsWithBreaks = titles.reduce((acc, lineWords, lineIndex) => {
    lineWords.forEach((word) => acc.push(word));
    if (lineIndex < titles.length - 1) {
      acc.push("\n"); // Use '\n' to represent line breaks
    }
    return acc;
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      style={{ whiteSpace: "pre-wrap" }} // Preserve line breaks
    >
      {wordsWithBreaks.map((word, idx) => {
        if (word === "\n") {
          return <br key={`br-${idx}`} />;
        } else {
          return (
            <motion.span
              key={idx}
              className="font-sans"
              variants={wordVariants}
            >
              {word}&nbsp;
            </motion.span>
          );
        }
      })}
    </motion.div>
  );
};

const HeroSection = () => {
  const heroTitle: string[] = ["AI-Powered Challenges,", "Built by You"];
  const heroTitleWords: string[][] = heroTitle.map((line) => line.split(" "));

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
            <div className="flex flex-row items-start">
              <div className="inline-flex items-center">
                <HeroTitle titles={heroTitleWords} />
              </div>
            </div>
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
