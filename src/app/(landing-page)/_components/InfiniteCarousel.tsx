import React, { useEffect, useState } from "react";
import conceptsList from "./concepts";
import { AnimatePresence, motion } from "framer-motion";

const InfiniteCarousel = () => {
  const [conceptsDisplay, setConceptsDisplay] = useState(
    conceptsList
      .slice(0, 4)
      .map((item) => ({ ...item, id: Date.now() + Math.random() }))
  );
  const [index, setIndex] = useState(4);
  const [replacementIndex, setReplacementIndex] = useState(0);

  useEffect(() => {
    const updateConceptsDisplay = () => {
      setConceptsDisplay((prevDisplay) => {
        const newDisplay = [...prevDisplay];
        const newItem = {
          ...conceptsList[index % conceptsList.length],
          id: Date.now() + Math.random(),
        };
        newDisplay[replacementIndex % newDisplay.length] = newItem;
        return newDisplay;
      });

      setReplacementIndex((prev) => prev + 1);
      setIndex((prev) => (prev + 1) % conceptsList.length);
    };

    const interval = setInterval(updateConceptsDisplay, 2000);
    return () => clearInterval(interval);
  }, [replacementIndex, index]); // no more dependency on `conceptsDisplay`

  const variants = {
    enter: { y: 60, opacity: 0 },
    center: { y: 0, opacity: 100 },
    exit: { y: -60, opacity: 0 },
  };
  return (
    <>
      {/* Desktop Version: Display all elements */}
      <AnimatePresence initial={false}>
        {conceptsDisplay.map(({ name, icon: Icon, color }, idx) => (
          <motion.div
            className="hidden w-72 h-16 md:flex flex-col items-center group cursor-pointer"
            key={name + idx}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            layout
          >
            <div className="flex items-center justify-center space-x-1">
              <span>
                <Icon width={48} height={48} color={color} />
              </span>
              <h3 className="font-serif text-3xl text-white truncate font-medium ">
                {name}
              </h3>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      {/* Mobile Version: Display only the first element */}
      {conceptsDisplay.slice(0, 1).map(({ name, icon: Icon, color }) => (
        <motion.div
          className="md:hidden w-full h-16 flex flex-col items-center justify-center group cursor-pointer"
          key={name}
        >
          <div className="flex items-center justify-center space-x-1">
            <span>
              <Icon width={36} height={36} color={color} />
            </span>
            <h3 className="font-serif text-2xl text-white truncate font-medium ">
              {name}
            </h3>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default InfiniteCarousel;
