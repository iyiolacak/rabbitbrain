import { Button } from "@/components/ui/button";
import React from "react";
import { FaGithub } from "react-icons/fa";

const HeroIntro = () => {
  return (
    <div className="py-12 mb-8 px-4">
      <h1 className="text-5xl font-serif">Learn Anything. Free.</h1>
      <h2 className="mx-auto max-w-2xl mt-5 text-zinc-400 text-xl md:text-3xl font-medium mb-4">
        rabbitbrain – It&apos;s your <span className="text-primary">interactive learning playground</span>, powered by{" "}
        AI and driven by you.
      </h2>
      <p className="md:mt-12 mt-8 text-xl flex flex-col md:flex-row md:inline-flex md:text-2xl text-primary items-center">
        {" "}
        <span className="inline-flex">
        <span className="font-semibold">rabbitbrain&nbsp;</span> is a free, <br />
        </span>
        <a
          href="https://github.com/iyiolacak/rabbitbrain"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center ml-1"
        >
          <FaGithub className="mr-1 items-center" size={36} />
          open-source platform.
        </a>
      </p>
    </div>
  );
};

export default HeroIntro;
