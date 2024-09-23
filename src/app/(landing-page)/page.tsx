"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import HeroSection from "./_components/HeroSection";
import { motion } from "framer-motion";
import FooterCTA from "./_components/FooterCTA";
import conceptsList from "./_components/concepts";
import InfiniteCarousel from "./_components/InfiniteCarousel";
import Footer from "./_components/Footer";
import HeroIntro from "./_components/HeroIntro";

const LandingPage = () => {
  return (
    <div className="w-full min-h-screen bg-black">
      <HeroSection />
      <section className="w-full py-3 md:py-6 px-6 md:px-8 bg-black">
        <div className="w-full flex justify-center md:space-x-10 mb-3 md:mb-16">
          <InfiniteCarousel />
        </div>

        <section className="py-10">
          <div>
            <h1 className="text-6xl md:text-[172px] mb-16 text-white flex justify-center transition-all">
              {`learn anything`}.
            </h1>
          </div>
          <div className="max-w-2xl lg:max-w-5xl mx-auto">
            <HeroIntro/>
          </div>
        </section>
      </section>
      <FooterCTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
