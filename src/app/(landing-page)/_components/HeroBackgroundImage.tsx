import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const HeroBackgroundImage = () => {
  return (
    <>
      {/* Background Image with Framer Motion */}
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
        className="absolute inset-0 z-0"
      >
        {/* Desktop Image */}
        <div className="hidden sm:block relative w-full h-full">
          <Image
            src="/brain-surrounded-by-rabbits-renaissance-style.webp"
            alt="Rabbits and Brain"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            quality={100}
            priority
          />
        </div>
        {/* Mobile Image */}
        <div className="sm:hidden relative w-full h-full">
          <Image
            src="/brain-surrounded-by-rabbits-mobile.webp"
            alt="Rabbits and Brain (Mobile)"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            quality={100}
            priority
          />
        </div>
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
      </motion.div>
    </>
  );
};

export default HeroBackgroundImage;
