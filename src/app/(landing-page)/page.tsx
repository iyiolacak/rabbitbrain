"use client";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import {
  Brain,
  Code,
  SigmaFunction,
  Atom,
  ShieldCheck,
  Lock,
  DatabaseStats,
  Flask,
  BrainElectricity,
} from "iconoir-react";
import Hero from "./_components/Hero";



const LandingPage = () => {
  const router = useRouter();
  const handleSignUpCTA = () => router.push("/sign-up");

  const width = 36;
  const height = width;
  const concepts = [
    {
      name: "Brain Teasers",
      description: "Fun Puzzles to Sharpen Your Mind",
      icon: <Brain width={width} height={height} color="#F59E0B" />, // Orange
    },
    {
      name: "Math",
      description: "Tackle Numbers with Confidence",
      icon: <SigmaFunction width={width} height={height} color="#10B981" />, // Green
    },
    {
      name: "Science",
      description: "Explore the World, One Concept at a Time",
      icon: <Atom width={width} height={height} color="#3B82F6" />, // Blue
    },
    {
      name: "Programming & AI",
      description: "Build your first smart AI—Step by Step",
      icon: <Code width={width} height={height} color="#6366F1" />, // Indigo
    },
    {
      name: "Data Science",
      description: "Turn Data into Simple Insights",
      icon: <DatabaseStats width={width} height={height} color="#EF4444" />, // Red
    },
    {
      name: "Cybersecurity",
      description: "Keep Systems Safe in a Fun Way",
      icon: <ShieldCheck width={width} height={height} color="#06B6D4" />, // Cyan
    },
    {
      name: "Chemistry",
      description: "Understand Reactions",
      icon: <Flask width={width} height={height} color="#A855F7" />, // Purple
    },
    {
      name: "Cryptography",
      description: "Unlock the Secrets of Secure Tech",
      icon: <Lock width={width} height={height} color="#F97316" />, // Orange
    },
    {
      name: "Psychology & Behavior",
      description: "Learn What Makes Us Tick",
      icon: <BrainElectricity width={width} height={height} color="#F43F5E" />, // Pink
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* First Section - Hero */}
      <Hero/>

      {/* Second Section */}
      <section className="bg-white py-6 px-6 md:px-6">
        <div className="overflow-x-auto overflow-y-hidden w-full flex flex-row space-x-10 items-start justify-start mb-16">
          {concepts.map((concept) => (
            <div
              className="min-w-max p-4 flex flex-col items-center justify-center group cursor-pointer"
              key={concept.name}
            >
              <div className="flex flex-row space-x-2 items-center justify-center text-center">
                <span>{concept.icon}</span>
                <h3 className="font-serif font-medium text-3xl text-zinc-800">
                  {concept.name}
                </h3>
              </div>
              <p className="text-center text-md max-w-42 text-zinc-500 mt-1">
                {concept.description}
              </p>
            </div>
          ))}
        </div>
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
