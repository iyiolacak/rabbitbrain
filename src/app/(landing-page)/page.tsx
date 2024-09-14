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
} from "iconoir-react";
import Hero from "./_components/Hero";
import { motion } from "framer-motion";

const conceptsList = [
  { name: "Brain Teasers", description: "Fun Puzzles to Sharpen Your Mind", icon: Brain, color: "#F59E0B" }, // Orange
  { name: "Math", description: "Tackle Numbers with Confidence", icon: SigmaFunction, color: "#10B981" }, // Green
  { name: "Science", description: "Explore the World, One Concept at a Time", icon: Atom, color: "#3B82F6" }, // Blue
  { name: "Programming & AI", description: "Build your first smart AI—Step by Step", icon: Code, color: "#6366F1" }, // Indigo
  { name: "Data Science", description: "Turn Data into Simple Insights", icon: DatabaseStats, color: "#EF4444" }, // Red
  { name: "Cybersecurity", description: "Keep Systems Safe in a Fun Way", icon: ShieldCheck, color: "#06B6D4" }, // Cyan
  { name: "Chemistry", description: "Understand Reactions", icon: Flask, color: "#A855F7" }, // Purple
  { name: "Cryptography", description: "Unlock the Secrets of Secure Tech", icon: Lock, color: "#F97316" }, // Orange
  { name: "Psychology & Behavior", description: "Learn What Makes Us Tick", icon: BrainElectricity, color: "#F43F5E" }, // Pink
];
const LandingPage = () => {
  const router = useRouter();
  const handleSignUpCTA = () => router.push("/sign-up");
  const [hoverIndex, setHoverIndex] = useState(null);

  // const conceptsList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [index, setIndex] = useState(4);
  const [replacementIndex, setReplacementIndex] = useState(0);
  const [conceptsDisplay, setConceptsDisplay] = useState<typeof conceptsList>([
    conceptsList[0],
    conceptsList[1],
    conceptsList[2],
    conceptsList[3],
  ]);

  const handleNextReplacement = () => {
    function positiveMod(n: number, m: number): number {
      return ((n + m) % m) % m;
    }

    const nextIndexToReplace = positiveMod(replacementIndex - 4, conceptsDisplay.length);
    // -4 % 4 = 0
    // 0 % 4 = 0
    
    setConceptsDisplay((prevDisplay) => {

      const newDisplay = [...prevDisplay];
      newDisplay[nextIndexToReplace] = conceptsList[index % conceptsList.length];
      // Return the new array, causing React to update the state
      return newDisplay;
    });
    setReplacementIndex(prev => prev + 1)
    setIndex((prevIndex) => (prevIndex + 1) % conceptsList.length);
  };

  // Stop updating once we cycle through the full conceptsList
  console.log(conceptsDisplay);
  return (
    <div className="min-h-screen bg-black">
      {/* <Hero /> */}

      <section className="bg-white py-6 px-6 md:px-6">
        <div className="w-full flex justify-center space-x-10 mb-16">
          <p className="font-bold text-zinc-400 mr-20">{index}</p>
          {/* {conceptsDisplay.map((item, idx) => (
            <span key={idx} style={{ marginRight: "10px" }}>
              {item}
            </span>
          ))} */}
          <Button
            onClick={handleNextReplacement}
            disabled={index >= conceptsList.length}
          >
            Next Replacement
          </Button>
          {conceptsDisplay.map(({ name, icon: Icon, color }) => (
            <motion.div
            className="min-w-max p-4 flex flex-col items-center group cursor-pointer"
            key={name}
            >
              <div className="flex items-center space-x-2">
                <span>
                  <Icon width={36} height={36} color={color} />
                </span>
                <h3 className="font-serif text-3xl text-zinc-800 font-medium">
                  {name}
                </h3>
              </div>
            </motion.div>
          ))}
          {/* Show the updated array on the screen */}
        </div>

        <div>
          <h1></h1>
        </div>
        <div className="max-w-2xl lg:max-w-5xl mx-auto">
          <h2 className="text-black text-2xl md:text-4xl block font-medium text-center mb-8">
            Rabbitbrain is a free,{" "}
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
            <span className="text-zinc-400">
              &nbsp;where you train your mind with <span>AI-generated</span> and
              &nbsp;
              <span className="hover:text-green-500 transition-colors cursor-pointer">
                community-created
              </span>
              &nbsp;challenges. No paywalls, no limits—just smarter thinking,
              one challenge at a time.
            </span>
          </h2>
        </div>
      </section>

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
