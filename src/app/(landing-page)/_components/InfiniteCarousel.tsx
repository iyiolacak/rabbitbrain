import React, { useEffect, useState } from "react";
import conceptsList from "./concepts";
import { AnimatePresence, motion } from "framer-motion";

const InfiniteCarousel = () => {
  function generateUniqueId(): string {
    const uniqueId = Date.now() + Math.random().toString(36);
    return uniqueId;
  }
  const MAX_ITEMS = 4;
  const [conceptsDisplay, setConceptsDisplay] = useState(
    conceptsList.slice(0, MAX_ITEMS).map((item) => ({ ...item }))
  );
  const [index, setIndex] = useState(MAX_ITEMS);
  const [replacementIndex, setReplacementIndex] = useState(0);

  useEffect(() => {
    const updateConceptsDisplay = () => {
      setConceptsDisplay((prevDisplay) => {
        const newDisplay = [...prevDisplay];
        const newItem = {
          ...conceptsList[index % conceptsList.length],
          id: generateUniqueId(),
        };
        newDisplay[replacementIndex] = newItem;
        return newDisplay;
      });
      setReplacementIndex((prev) => (prev + 1) % MAX_ITEMS); // 0, 1, 2, 3 - loop
      setIndex((prev) => (prev + 1) % conceptsList.length); // conceptsList.length(e.g. 10 items) loop
    };

    const interval = setInterval(updateConceptsDisplay, 2500);
    return () => clearInterval(interval);
  }, [index, replacementIndex]); // no more dependency on `conceptsDisplay`

  console.log("concepts display", conceptsDisplay);

  return (
    <>
      {/* Desktop Version: Display all elements */}
      <AnimatePresence mode="wait">
        {conceptsDisplay.map(({ name, icon: Icon, color }, idx) => (
          <motion.div
            className="hidden min-w-[300px] bg-green-600 h-16 md:flex flex-col items-center group cursor-pointer"
            key={name + idx}
          >
            <div className="flex items-center justify-center space-x-1">
              <span>
                <Icon width={38} height={38} color={color} />
              </span>
              <h3 className="font-serif text-xl text-white truncate font-medium ">
                {name}
              </h3>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      {/* Mobile Version: Display only the first element */}
      {conceptsDisplay.slice(0, 1).map(({ name, icon: Icon, color }) => (
        <div
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
        </div>
      ))}
    </>
  );
};

export default InfiniteCarousel;
