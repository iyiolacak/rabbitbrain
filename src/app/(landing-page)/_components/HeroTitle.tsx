import { motion } from "framer-motion";
import React from "react";

// Change the type of title prop to string[][]
const HeroTitle = ({ title }: { title: string[][] }) => {
  // Define the animation behavior
  const containerVariants = {
    animate: {
      transition: {
      },
    },
  };

  const characterVariants = {
    initial: { color: "#303030" }, // Start with gray
    animate: (custom: number) => ({
      color: "#ffffff", // Change to white
      transition: {
        duration: 0.05, // Duration for smooth fade-in
        delay: custom, // Delay based on index
      },
    }),
  };

  // Splits words into smaller chunks
  const splitIntoCharacterStacks = (word: string, stackSize: number) => {
    const stacks = [];
    for (let i = 0; i < word.length; i += stackSize) {
      stacks.push(word.slice(i, i + stackSize));
    }
    return stacks;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      style={{ whiteSpace: "pre-wrap" }} // Keep line breaks
    >
      {title.map((lineWords, lineIdx) => (
        <div key={`line-${lineIdx}`}>
          {lineWords.map((word, wordIdx) => {
            // Break each word into smaller parts
            const characterStacks = splitIntoCharacterStacks(word, 3);
            return (
              <motion.span
                key={`word-${lineIdx}-${wordIdx}`}
                className="font-sans"
              >
                {characterStacks.map((stack, stackIdx) => {
                  // Calculate delay based on current word and stack position
                  const baseDelay =
                    (lineIdx * lineWords.length + wordIdx) * 0.2 +
                    stackIdx * 0.05;
                  return (
                    <motion.span
                      key={`stack-${lineIdx}-${wordIdx}-${stackIdx}`}
                      variants={characterVariants}
                      custom={baseDelay}
                    >
                      {stack}
                    </motion.span>
                  );
                })}
                &nbsp;
              </motion.span>
            );
          })}
          <br />
        </div>
      ))}
    </motion.div>
  );
};

export default HeroTitle;
