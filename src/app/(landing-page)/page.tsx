"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import HeroSection from "./_components/HeroSection";
import { motion } from "framer-motion";
import FooterCTA from "./_components/FooterCTA";
import conceptsList from "./_components/concepts";
import InfiniteCarousel from "./_components/InfiniteCarousel";

const LandingPage = () => {

  return (
    <div className="w-full min-h-screen bg-black">
      <HeroSection />
      <section className="w-full py-3 md:py-6 px-6 md:px-8 bg-black">
        <div className="w-full flex justify-center md:space-x-10 mb-3 md:mb-16">
          <InfiniteCarousel/>
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
