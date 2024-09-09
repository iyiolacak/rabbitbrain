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

      {/* Challenges List Section */}
      <section className="bg-orange-50 py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-orange-600 text-3xl md:text-4xl font-medium text-center mb-12">
            Explore Our Challenges
          </h2>

          {/* List of Challenges */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example Challenge Card */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl border p-6"
            >
              <h3 className="text-xl font-semibold text-black mb-4">
                Math Challenge: Prime Numbers
              </h3>
              <p className="text-gray-600 mb-4">
                Test your math skills by identifying prime numbers from a set.
              </p>
              <Link href="/challenges/math-prime">
                <Button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600">
                  Take Challenge
                </Button>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl border p-6"
            >
              <h3 className="text-xl font-semibold text-black mb-4">
                Logic Puzzle: The Maze
              </h3>
              <p className="text-gray-600 mb-4">
                Navigate through a series of logical steps to find your way out.
              </p>
              <Link href="/challenges/logic-maze">
                <Button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600">
                  Take Challenge
                </Button>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl border p-6"
            >
              <h3 className="text-xl font-semibold text-black mb-4">
                Science Quiz: Elements
              </h3>
              <p className="text-gray-600 mb-4">
                Identify different elements from clues provided.
              </p>
              <Link href="/challenges/science-elements">
                <Button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600">
                  Take Challenge
                </Button>
              </Link>
            </motion.div>

            {/* Add more challenges as needed */}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-orange-600 py-16 text-center">
        <h2 className="text-white text-3xl md:text-4xl font-medium mb-6">
          Ready to Create Your Own Challenge?
        </h2>
        <p className="text-white text-lg mb-8">
          Join the community and start building your own brain-busting
          challenges.
        </p>
        <Button
          onClick={handleSignUpCTA}
          className="bg-white text-orange-600 px-8 py-4 text-md tracking-tight rounded-full hover:bg-neutral-300"
        >
          Get Started Now
        </Button>
      </section>
    </div>
  );
};

export default ChallengesPage;
