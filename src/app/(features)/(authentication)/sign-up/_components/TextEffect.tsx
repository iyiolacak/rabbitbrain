import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const splitTextToWordsAndCharacters = (text: string) => {
  return text.split(" ").map((word) => word.split(""));
};

const characterVariants = {
  hidden: { opacity: 0, y: -20, filter: "blur(3px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.03,
      type: "spring",
      damping: 12,
      stiffness: 100,
      filter: { delay: i * 0.03, duration: 0.3, ease: "easeOut" }
    },
  }),
};

const TextEffect = ({ text }: { text: string }) => {
  const wordsAndCharacters = splitTextToWordsAndCharacters(text);

  return (
    <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
      <span className="sr-only">{text}</span>
      {wordsAndCharacters.map((word, wordIndex) => (
        <span
          key={`word-${wordIndex}`}
          style={{ display: "inline-block", whiteSpace: "nowrap" }} // Ensure word stays together
        >
          {word.map((char, charIndex) => (
            <motion.span
              aria-hidden
              key={`char-${wordIndex}-${charIndex}`}
              initial="hidden"
              animate="visible"
              custom={wordIndex * word.length + charIndex} // Adjust delay based on word and char position
              variants={characterVariants}
              style={{
                display: "inline-block",
                whiteSpace: "pre", // Maintain spaces
              }}
            >
              {char}
            </motion.span>
          ))}
          {/* Space between words */}
          <motion.span aria-hidden style={{ display: "inline-block", width: "1rem" }}>
          &nbsp;
          </motion.span>
        </span>
      ))}
    </div>
  );
};

export default TextEffect;
