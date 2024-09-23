import React from "react";
import { FaGithub } from "react-icons/fa";

const HeroIntro = () => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-zinc-400 text-2xl md:text-4xl font-medium mb-4">
        rabbitbrain – It&apos;s your interactive learning playground, powered by{" "}
        AI and driven by you.
      </h2>
      <p className="mt-12 text-2xl items-center text-center inline-flex text-primary/70">
        rabbitbrain is a free,&nbsp;
        <a
          href="https://github.com/iyiolacak/rabbitbrain"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center hover:text-primary transition-colors"
        >
          <FaGithub className="mr-1" size={36} />open-source platform
        </a>
        .
      </p>
    </div>
  );
};

export default HeroIntro;
