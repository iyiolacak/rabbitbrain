import React from "react";
import Image from "next/image";

const SignUpPageOtherHalf = () => {
  return (
    <div className="absolute inset-0 flex bg-primary">
      <Image
        src="/background.webp"
        alt="background image"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <h2 className="relative z-1 px-6 text-end items-end flex justify-end text-6xl text-white">
        Get ahead with rabbitbrain.
      </h2>
    </div>
  );
};

export default SignUpPageOtherHalf;
