import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";
import { ConceptDisplay as ConceptDisplayType } from "./InfiniteCarousel";

interface ConceptDisplayProps extends ConceptDisplayType {
  handleMouseEnter: (id: string) => void;
  handleMouseLeave: (id: string) => void;
  isHovered: boolean;
  hoveredItems: { [key: string]: boolean };
}

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const ConceptDisplay = ({
  id,
  name,
  icon: Icon,
  handleMouseEnter,
  handleMouseLeave,
  color,
  isHovered,
  hoveredItems,
}: ConceptDisplayProps) => {

  const isAnyItemHovered = Object.values(hoveredItems).some(Boolean);

  return (
    <motion.div
      className="h-16 flex flex-col items-center justify-center group cursor-pointer "
      key={id}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
      onMouseEnter={() => handleMouseEnter(id)}
      onMouseLeave={() => handleMouseLeave(id)}
    >
      <div className="relative flex items-center justify-center space-x-1">
        <span>
          <Icon
            width={48}
            height={48}
            className="transition-colors"
            color={isAnyItemHovered && !isHovered ? "#808080" : color}
          />
        </span>
        <h3
          className={cn(
            `font-serif text-xl md:text-xl lg:text-2xl transition-colors text-zinc-200 truncate font-medium`,
            {
              "text-zinc-500": isAnyItemHovered && !isHovered,
              "text-white": isHovered,
            }
          )}
        >
          {name}
        </h3>
        <div className="absolute bg-white/0 w-full h-full">

        </div>
      </div>
    </motion.div>
  );
};

export default ConceptDisplay;
