import React from "react";
import { FaGithub } from "react-icons/fa";

const HeroIntro = () => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-zinc-400 text-2xl md:text-4xl font-medium mb-4">
        rabbitbrain – It&apos;s your interactive learning playground, powered by{" "}
        AI and driven by you.
      </h2>
      <p className="text-zinc-700 mb-4">
      </p>
      <p className="text-zinc-700">
        rabbitbrain is a free,{" "}
        <a
          href="https://github.com/iyiolacak/rabbitbrain"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center hover:text-primary transition-colors"
        >
          <FaGithub className="mr-2" size={24} />
          open-source platform
        </a>
        .
      </p>
    </div>
  );
};

export default HeroIntro;
