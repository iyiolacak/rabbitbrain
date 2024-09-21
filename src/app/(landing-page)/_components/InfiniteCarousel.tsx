import React, { useEffect, useState } from "react";
import conceptsList from "./concepts";
import { AnimatePresence, motion } from "framer-motion";

const InfiniteCarousel = () => {
  function generateUniqueId(): string {
    return Date.now() + Math.random().toString(36);
  }

  const MAX_ITEMS = 4; // Maintain max items
  const [conceptsDisplay, setConceptsDisplay] = useState(
    conceptsList.slice(0, MAX_ITEMS).map((item) => ({
      ...item,
      id: generateUniqueId(),
    }))
  );
  const [index, setIndex] = useState(MAX_ITEMS); // For keeping track of new items
  const [replacementIndex, setReplacementIndex] = useState(0); // To know which item to replace

  useEffect(() => {
    const updateConceptsDisplay = () => {
      // Start by removing the item at `replacementIndex`
      setConceptsDisplay((prevDisplay) => {
        const newDisplay = [...prevDisplay];
        newDisplay.splice(replacementIndex, 1); // Remove the item at replacementIndex
        return newDisplay;
      });

      // After a small delay, add the new item in the same place
      setTimeout(() => {
        setConceptsDisplay((prevDisplay) => {
          const newDisplay = [...prevDisplay];
          const newItem = {
            ...conceptsList[index % conceptsList.length],
            id: generateUniqueId(), // Give it a new unique id
          };
          newDisplay.splice(replacementIndex, 0, newItem); // Insert new item at the replacement index
          return newDisplay;
        });

        // Cycle through indices
        setReplacementIndex((prev) => (prev + 1) % MAX_ITEMS);
        setIndex((prev) => (prev + 1) % conceptsList.length);
      }, 300); // Delay for smooth animation
    };

    const interval = setInterval(updateConceptsDisplay, 3000); // Adjust time for removal + new entry

    return () => clearInterval(interval);
  }, [index, replacementIndex]);

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }, // Smooth exit
  };

  return (
    <>
      {/* Desktop Version: Display all elements */}
      <div className="flex flex-row space-x-12">
        <AnimatePresence>
          {conceptsDisplay.map(({ name, icon: Icon, color, id }) => (
            <motion.div
              className="min-w-[300px] h-16 md:flex flex-col items-center group cursor-pointer"
              key={id} // Unique key to manage animations
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
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
      </div>
    </>
  );
};

export default InfiniteCarousel;
