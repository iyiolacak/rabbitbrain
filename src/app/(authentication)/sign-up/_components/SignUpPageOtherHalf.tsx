"use client";
import React from "react";
import Image from "next/image";

const SignUpPageOtherHalf = () => {
  return (
    <div className="z-0 flex min-h-full min-w-full items-center justify-start bg-primary">
      <Image
        src="/background.webp"
        alt="background image"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
      />{" "}
      <h2 className="flex h-full justify-center items-center space-x-4 px-3 text-start text-6xl text-white">
        Get ahead with rabbitbrain.
      </h2>
    </div>
  );
};

export default SignUpPageOtherHalf;
