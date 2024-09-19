"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import HeroSection from "./_components/HeroSection";
import { motion } from "framer-motion";
import FooterCTA from "./_components/FooterCTA";
import conceptsList from "./_components/concepts";

const LandingPage = () => {
  const indexRef = useRef(4);
  const replacementIndexRef = useRef(0);
  const conceptsDisplayRef = useRef(conceptsList.slice(0, 4));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const updateConceptsDisplay = () => {
      const newDisplay = [...conceptsDisplayRef.current];
      newDisplay[replacementIndexRef.current % newDisplay.length] =
        conceptsList[indexRef.current % conceptsList.length];
      conceptsDisplayRef.current = newDisplay;

      replacementIndexRef.current += 1;
      indexRef.current = (indexRef.current + 1) % conceptsList.length;
    };
    const interval = setInterval(updateConceptsDisplay, 500);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full min-h-screen bg-black">
      <HeroSection />
      <section className="w-full py-3 md:py-6 px-6 md:px-8 bg-black">
        <div className="w-full flex justify-center md:space-x-10 mb-3 md:mb-16">
          {/* Desktop Version: Display all elements */}
          {conceptsDisplayRef.current.map(({ name, icon: Icon, color }) => (
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
          {conceptsDisplayRef.current
            .slice(0, 1)
            .map(({ name, icon: Icon, color }) => (
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
      <FooterCTA />
    </div>
  );
};

export default LandingPage;
