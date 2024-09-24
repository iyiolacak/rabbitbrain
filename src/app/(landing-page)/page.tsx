"use client";
import React from "react";
import { FaGithub } from "react-icons/fa"; // move this down if not used
import { motion } from "framer-motion"; // keep externals up top

// Internal components
import HeroSection from "./_components/HeroSection";
import FooterCTA from "./_components/FooterCTA";
import InfiniteCarousel from "./_components/InfiniteCarousel";
import Footer from "./_components/Footer";
import HeroIntro from "./_components/HeroIntro";

const LandingPage = () => {
  return (
    <div className="w-full min-h-screen bg-black">
      {/* Main hero section */}
      <HeroSection />

      {/* Carousel section */}
      <section className="py-3 md:py-6">
        <div className="w-full flex justify-center px-6 md:px-8 mb-3 ">
          <InfiniteCarousel />
        </div>
      </section>

      {/* Learning section */}
      <section className="py-10 bg-white text-center">
        <div className="container mx-auto">
          <HeroIntro />
        </div>
      </section>

      {/* Footer sections */}
      <div className="px-4 md:px-8 pt-2 pb-5 bg-white">
        <FooterCTA />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
