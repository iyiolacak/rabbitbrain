"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import {
  Brain,
  SigmaFunction,
  Atom,
  Code,
  DatabaseStats,
  ShieldCheck,
  Flask,
  Lock,
  BrainElectricity,
  EmojiPuzzled,
  Group,
  CodeBrackets,
} from "iconoir-react";
import Hero from "./_components/Hero";
import { motion } from "framer-motion";

const conceptsList = [
  {
    name: "Brain Teasers",
    description: "Fun Puzzles to Sharpen Your Mind",
    icon: Brain,
    color: "#f497da", // Deep Amber
  },
  {
    name: "Math",
    description: "Tackle Numbers with Confidence",
    icon: SigmaFunction,
    color: "#6f9ceb", // Teal Green
  },
  {
    name: "Science",
    description: "Explore the World, One Concept at a Time",
    icon: Atom,
    color: "#007fff", // Deep Blue
  },
  {
    name: "Programming & AI",
    description: "Build your first smart AI—Step by Step",
    icon: CodeBrackets,
    color: "#6a0f49", // Royal Indigo
  },
  {
    name: "Data Science",
    description: "Turn Data into Simple Insights",
    icon: DatabaseStats,
    color: "#DC2626", // Crimson Red
  },
  {
    name: "Cybersecurity",
    description: "Keep Systems Safe in a Fun Way",
    icon: ShieldCheck,
    color: "#0891B2", // Dark Cyan
  },
  {
    name: "Chemistry",
    description: "Understand Reactions",
    icon: Flask,
    color: "#6e44ff", // Vivid Violet
  },
  {
    name: "Cryptography",
    description: "Unlock the Secrets of Secure Tech",
    icon: Lock,
    color: "#f4e409", // Burnt Orange
  },
  {
    name: "Psychology",
    description: "Learn What Makes Us Tick",
    icon: Group,
    color: "#c3423f", // Ruby Wine
  },
];
const LandingPage = () => {
  const router = useRouter();
  const handleSignUpCTA = () => router.push("/sign-up");
  const [hoverIndex, setHoverIndex] = useState(null);

  const [index, setIndex] = useState(4);
  const [replacementIndex, setReplacementIndex] = useState(0);
  const [conceptsDisplay, setConceptsDisplay] = useState<typeof conceptsList>([
    conceptsList[0],
    conceptsList[1],
    conceptsList[2],
    conceptsList[3],
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const handleNextReplacement = () => {
        // if `n` is negative, it could cause an array index issue.
        function positiveMod(n: number, m: number): number {
          return (n + m) % m;
        }

        const nextIndexToReplace = positiveMod(
          replacementIndex,
          conceptsDisplay.length
        );

        setConceptsDisplay((prevDisplay) => {
          const newDisplay = [...prevDisplay];
          newDisplay[nextIndexToReplace] =
            conceptsList[index % conceptsList.length];
          // Return the new array, causing React to update the state
          return newDisplay;
        });
        setReplacementIndex((prev) => prev + 1);
        setIndex((prevIndex) => (prevIndex + 1) % conceptsList.length);
      };
      handleNextReplacement();
    }, 500);
    return () => clearInterval(interval);
  }, [conceptsDisplay, index, replacementIndex]);

  // Stop updating once we cycle through the full conceptsList
  console.log(conceptsDisplay);

  return (
    <div className="w-full min-h-screen bg-black">
      <Hero />
      <section className="w-full py-3 md:py-6 px-6 md:px-8 bg-black">
        <div className="w-full flex justify-center md:space-x-10 mb-3 md:mb-16">
          {/* Desktop Version: Display all elements */}
          {conceptsDisplay.map(({ name, icon: Icon, color }) => (
            <motion.div
              className="hidden w-72 h-16 md:flex flex-col items-center group cursor-pointer"
              key={name}
            >
              <div className="flex items-center justify-center space-x-1">
                <span>
                  <Icon width={48} height={48} color={color} />
                </span>
                <h3 className="font-serif text-3xl text-white truncate font-medium ">
                  {name}
                </h3>
              </div>
            </motion.div>
          ))}
          {/* Mobile Version: Display only the first element */}
          {conceptsDisplay.slice(0, 1).map(({ name, icon: Icon, color }) => (
            <motion.div
              className="md:hidden w-full h-16 flex flex-col items-center justify-center group cursor-pointer"
              key={name}
            >
              <div className="flex items-center justify-center space-x-1">
                <span>
                  <Icon width={36} height={36} color={color} />
                </span>
                <h3 className="font-serif text-2xl text-white truncate font-medium ">
                  {name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        <section className="py-10">
          <div>
            <h1 className="text-6xl md:text-9xl text-zinc-200 flex justify-center transition-all">
              rabbitbrain
            </h1>
          </div>
          <div className="max-w-2xl lg:max-w-5xl mx-auto">
            <h2 className="text-zinc-800 text-2xl md:text-4xl block font-medium text-center mb-8">
              is a free,{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="inline hover:text-blue-600 align-baseline transition-colors cursor-pointer items-center"
                href="https://github.com/iyiolacak/rabbitbrain"
              >
                <FaGithub className="mr-1 inline" size={32} />
                open-source
              </a>
              &nbsp;platform
              <span className="text-zinc-900">
                &nbsp;where you train your mind with <span>AI-generated</span>{" "}
                and &nbsp;
                <span className="hover:text-green-500 transition-colors cursor-pointer">
                  community-created
                </span>
                &nbsp;challenges. No paywalls, no limits—just smarter thinking,
                one challenge at a time.
              </span>
            </h2>
          </div>
        </section>
      </section>

      <section className="bg-orange-600 py-16 text-center">
        <div className="px-4">
          <h2 className="text-white font-serif text-3xl md:text-4xl font-medium mb-6">
            Ready to Create Your Own Challenge?
          </h2>
          <p className="text-white text-lg mb-8">
            Join the community and start building your own brain-busting
            challenges.
          </p>
        </div>
        <Button
          onClick={handleSignUpCTA}
          className="bg-white text-orange-600 font-medium px-8 py-4 text-md tracking-tight rounded-full hover:bg-neutral-300"
        >
          Get Started Now
        </Button>
      </section>
    </div>
  );
};

export default LandingPage;
