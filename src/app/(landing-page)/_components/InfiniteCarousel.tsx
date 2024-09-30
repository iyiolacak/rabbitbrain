import React, { useEffect, useState } from "react";
import conceptsList from "./concepts";
import { AnimatePresence, motion } from "framer-motion";

const InfiniteCarousel = () => {
  const MAX_ITEMS = 4;
  const [conceptsDisplay, setConceptsDisplay] = useState(
    conceptsList.slice(0, MAX_ITEMS).map((item) => ({
      ...item,
      id: generateUniqueId(),
    }))
  );

  const [index, setIndex] = useState(MAX_ITEMS);
  const [replacementIndex, setReplacementIndex] = useState(0);
  const [itemRemoved, setItemRemoved] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [hoveredItems, setHoveredItems] = useState(Array(MAX_ITEMS).fill(false));

  useEffect(() => {
    const updateConceptsDisplay = () => {
      setItemRemoved(false);

      setConceptsDisplay((prevDisplay) => {
        const newDisplay = [...prevDisplay];
        if (!hoveredItems[replacementIndex]) {
          newDisplay.splice(replacementIndex, 1);
        }
        return newDisplay;
      });

      setItemRemoved(true);
    };

    const interval = setInterval(() => {
      if (isActive) updateConceptsDisplay();
    }, 750);

    return () => clearInterval(interval);
  }, [index, replacementIndex, isActive, hoveredItems]);

  const handleExitComplete = () => {
    setConceptsDisplay((prevDisplay) => {
      const newDisplay = [...prevDisplay];
      const newItem = {
        ...conceptsList[index % conceptsList.length],
        id: generateUniqueId(),
      };
      newDisplay.splice(replacementIndex, 0, newItem);
      return newDisplay;
    });

    setReplacementIndex((prev) => (prev + 1) % MAX_ITEMS);
    setIndex((prev) => (prev + 1) % conceptsList.length);
  };

  const handleMouseEnter = (hoverIndex: number) => {
    setHoveredItems((prevHovered) => {
      const newHovered = [...prevHovered];
      newHovered[hoverIndex] = true;
      return newHovered;
    });
  };

  const handleMouseLeave = (hoverIndex: number) => {
    setHoveredItems((prevHovered) => {
      const newHovered = [...prevHovered];
      newHovered[hoverIndex] = false;
      return newHovered;
    });
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsActive(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full">
      <AnimatePresence onExitComplete={itemRemoved ? handleExitComplete : undefined} initial={false}>
        {conceptsDisplay.map(({ name, icon: Icon, color, id }, idx) => (
          <motion.div
            className="h-16 flex flex-col items-center group cursor-pointer"
            key={id}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            layout
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={() => handleMouseLeave(idx)}
          >
            <div className="flex items-center justify-center space-x-1">
              <span>
                <Icon width={48} height={48} color={color} />
              </span>
              <h3 className="font-serif text-xl md:text-3xl text-white truncate font-medium">
                {name}
              </h3>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

function generateUniqueId() {
  return Date.now() + Math.random().toString(36);
}

export default InfiniteCarousel;
