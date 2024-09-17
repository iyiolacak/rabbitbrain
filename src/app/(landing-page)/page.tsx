"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import {
  Brain,
  SigmaFunction,
  Atom,
  DatabaseStats,
  ShieldCheck,
  Flask,
  Lock,
  Group,
  CodeBrackets,
} from "iconoir-react";
import HeroSection from "./_components/HeroSection";
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
  const [conceptsDisplay, setConceptsDisplay] = useState(
    conceptsList.slice(0, 4)
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const interval = setInterval(() => {
      setConceptsDisplay((prevDisplay) => {
        const newDisplay = [...prevDisplay];
        newDisplay[replacementIndex % conceptsDisplay.length] =
          conceptsList[index % conceptsList.length];
        // Return the new array, causing React to update the state
        return newDisplay;
      });

      setReplacementIndex((prev) => prev + 1);
      setIndex((prevIndex) => (prevIndex + 1) % conceptsList.length);
    }, 500);
    return () => clearInterval(interval);
  }, [index, replacementIndex]);

  return (
    <div className="w-full min-h-screen bg-black">
      <HeroSection />
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
            <h1 className="text-6xl md:text-9xl text-white flex justify-center transition-all">
              rabbitbrain
            </h1>
          </div>
          <div className="max-w-2xl lg:max-w-5xl mx-auto">
            <h2 className="text-zinc-400 text-2xl md:text-4xl block font-medium text-center mb-8">
              It&apos;s your interactive learning playground, powered by{" "}
              <span className="">AI</span> and driven by{" "}
              <span className="">you</span>.&nbsp;
              <span className="text-zinc-700">
                Join a community that&apos;s here to learn by doing.
              </span>
              <span className="text-zinc-700">
                &nbsp;rabbitbrain is a free,{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline hover:text-primary align-baseline transition-colors cursor-pointer items-center"
                  href="https://github.com/iyiolacak/rabbitbrain"
                >
                  <FaGithub className="mr-1 inline" size={32} />
                  open-source
                </a>
                &nbsp;platform.
              </span>
            </h2>
          </div>
        </section>
      </section>

    </div>
  );
};

export default LandingPage;
