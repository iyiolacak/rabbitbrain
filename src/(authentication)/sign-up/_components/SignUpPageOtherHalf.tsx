"use client";
import Logo from "@/app/(dashboard)/dashboard/components/Logo";
import React from "react";
import { useState, useEffect } from "react";
import TextEffect from "./TextEffect";
import { AnimatePresence } from "framer-motion";

const adjectives = [
  "Hassle-free inventory management.",
];

const SignUpPageOtherHalf = () => {

  return (
    <div className="flex min-h-full min-w-full items-center justify-start bg-primary">
      <h2 className="flex h-full justify-center items-center space-x-4 px-3 text-start text-6xl text-white">
        <Logo size={64} />
        <TextEffect
          text={adjectives[0]}
        />
      </h2>
    </div>
  );
};

export default SignUpPageOtherHalf;
