import React from "react";
import Image from "next/image";

const SignUpPageOtherHalf = () => {
  return (
    <div className="flex w-full h-full">
      {/* Left: Image Section */}
      <div className="w-full relative rounded-xl overflow-hidden">
        <Image
          src="/background.webp"
          alt="background image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="z-0"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>

        {/* Text */}
        <div className="absolute inset-0 flex items-end justify-end p-6 z-20">
          <h2 className="text-5xl text-white">Einstein&apos;s secret? Lifelong curiosity and practice. Yours can be, too.</h2>
        </div>
      </div>
    </div>
  );
};

export default SignUpPageOtherHalf;
