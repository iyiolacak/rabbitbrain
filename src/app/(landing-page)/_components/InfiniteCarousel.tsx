import React, { useEffect, useState } from "react";
import conceptsList from "./concepts";
import { AnimatePresence, motion } from "framer-motion";

const InfiniteCarousel = () => {
  const MAX_ITEMS = 4; // keep carousel a manageable size
  const [conceptsDisplay, setConceptsDisplay] = useState(
    conceptsList.slice(0, MAX_ITEMS).map((item) => ({
      ...item,
      id: generateUniqueId(), // unique ids so react doesn’t implode when items get shuffled
    }))
  );
  
  const [index, setIndex] = useState(MAX_ITEMS); // keep track of where we are in the list of concepts
  const [replacementIndex, setReplacementIndex] = useState(0); // controls which item to remove/replace
  const [itemRemoved, setItemRemoved] = useState(false); // because we gotta wait for item removal animations (fancy)
  const [isActive, setIsActive] = useState(true); // tab visibility check - don't animate in the background like a creep
  const [hoveredItems, setHoveredItems] = useState(
    Array(MAX_ITEMS).fill(false) // to freeze items when hovered... frozen concepts, cute.
  );

  // this effect runs the "magic" carousel logic on an interval
  useEffect(() => {
    const updateConceptsDisplay = () => {
      setItemRemoved(false); // reset this before doing anything

      setConceptsDisplay((prevDisplay) => {
        const newDisplay = [...prevDisplay]; // clone so react doesn’t cry itself to sleep
        if (!hoveredItems[replacementIndex]) { // only remove item if it's not hovered
          newDisplay.splice(replacementIndex, 1); // get rid of the old item at `replacementIndex`
        }
        return newDisplay;
      });

      setItemRemoved(true); // we've removed something, let the animation system know
    };

    const interval = setInterval(() => {
      if (isActive) updateConceptsDisplay();
    }, 750);

    return () => clearInterval(interval);
  }, [index, replacementIndex, isActive, hoveredItems]);

  // fires when the exit animation completes, inserts a new item
  const handleExitComplete = () => {
    setConceptsDisplay((prevDisplay) => {
      const newDisplay = [...prevDisplay];
      const newItem = {
        ...conceptsList[index % conceptsList.length], // get the next item in the list, wrap around with modulo
        id: generateUniqueId(), // gotta have a fresh id for react keys or everything dies
      };
      newDisplay.splice(replacementIndex, 0, newItem); // shove it into the array at `replacementIndex`
      return newDisplay;
    });

    setReplacementIndex((prev) => (prev + 1) % MAX_ITEMS); // cycle to the next replacement index
    setIndex((prev) => (prev + 1) % conceptsList.length); // cycle through the concept list, wrap around as needed
  };

  // freezes the concept when mouse is over it, good for user interactions
  const handleMouseEnter = (hoverIndex: number) => {
    setHoveredItems((prevHovered) => {
      const newHovered = [...prevHovered];
      newHovered[hoverIndex] = true; // mark it as hovered
      return newHovered;
    }); // freeze on hover
  };

  // unfreeze the concept when the mouse leaves
  const handleMouseLeave = (hoverIndex: number) => {
    setHoveredItems((prevHovered) => {
      const newHovered = [...prevHovered];
      newHovered[hoverIndex] = false; // unmark the hover
      return newHovered;
    }); // freeze on hover
  };

  // effect for handling tab visibility, stop the animation if tab is not active
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsActive(!document.hidden); // browser API to detect if the tab is in the background
    };

    document.addEventListener("visibilitychange", handleVisibilityChange); // hook into tab visibility

    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange); // cleanup event listener
  }, []); // only needs to run once, because we're pros

  // animation variants for framer-motion
  const variants = {
    initial: { opacity: 0, y: 20 }, // start invisible and slightly shifted down
    animate: { opacity: 1, y: 0 }, // become visible and snap into place
    exit: { opacity: 0, y: -20 }, // fade out and shift up when removed
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full">
      <AnimatePresence
        onExitComplete={itemRemoved ? handleExitComplete : undefined} // only do stuff when an item is fully removed
        initial={false} // don't animate the initial load, that's just overkill
      >
        {conceptsDisplay.map(({ name, icon: Icon, color, id }, idx) => (
          <motion.div
            className="h-16 flex flex-col items-center group cursor-pointer"
            key={id} // because react will have a fit without unique keys
            variants={variants}
            initial="initial" // where we start
            animate="animate" // where we end
            exit="exit" // where we leave
            layout
            onMouseEnter={() => handleMouseEnter(idx)} // freeze item on hover
            onMouseLeave={() => handleMouseLeave(idx)} // unfreeze item on mouse leave
          >
            <div className="flex items-center justify-center space-x-1">
              <span>
                <Icon width={48} height={48} color={color} /> {/* dynamic icons because custom is classy */}
              </span>
              <h3 className="font-serif text-xl md:text-3xl text-white truncate font-medium">
                {name} {/* the concept name, because you know, that’s important */}
              </h3>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

function generateUniqueId() {
  return Date.now() + Math.random().toString(36); // not exactly UUID but it'll do for now
}

export default InfiniteCarousel;
