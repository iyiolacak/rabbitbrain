import React, { useReducer, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import conceptsList from "./concepts";

const MAX_ITEMS = window.innerWidth < 768 ? 2 : 4;
type State = {
  conceptsDisplay: Array<{
    id: string;
    name: string;
    icon: any;
    color: string;
  }>;
  index: number;
  replacementIndex: number;
  itemRemoved: boolean;
  isActive: boolean;
  hoveredItems: boolean[];
};

type Action =
  | { type: "UPDATE_DISPLAY" }
  | { type: "SET_ITEM_REMOVED"; payload: boolean }
  | { type: "HANDLE_EXIT_COMPLETE" }
  | { type: "SET_HOVER"; payload: { index: number; isHovered: boolean } }
  | { type: "SET_ACTIVE"; payload: boolean };

const initialState: State = {
  conceptsDisplay: conceptsList.slice(0, MAX_ITEMS).map((item) => ({
    ...item,
    id: generateUniqueId(),
  })),
  index: MAX_ITEMS,
  replacementIndex: 0,
  itemRemoved: false,
  isActive: true,
  hoveredItems: Array(MAX_ITEMS).fill(false),
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "UPDATE_DISPLAY":
      if (state.hoveredItems[state.replacementIndex]) {
        return state;
      }
      return {
        ...state,
        conceptsDisplay: state.conceptsDisplay.filter(
          (_, idx) => idx !== state.replacementIndex
        ),
        itemRemoved: true,
      };
    case "SET_ITEM_REMOVED":
      return { ...state, itemRemoved: action.payload };
    case "HANDLE_EXIT_COMPLETE":
      const newItem = {
        ...conceptsList[state.index % conceptsList.length],
        id: generateUniqueId(),
      };
      return {
        ...state,
        conceptsDisplay: [
          ...state.conceptsDisplay.slice(0, state.replacementIndex),
          newItem,
          ...state.conceptsDisplay.slice(state.replacementIndex),
        ],
        replacementIndex: (state.replacementIndex + 1) % MAX_ITEMS,
        index: (state.index + 1) % conceptsList.length,
      };
    case "SET_HOVER":
      return {
        ...state,
        hoveredItems: state.hoveredItems.map((item, idx) =>
          idx === action.payload.index ? action.payload.isHovered : item
        ),
      };
    case "SET_ACTIVE":
      return { ...state, isActive: action.payload };
    default:
      return state;
  }
}

const InfiniteCarousel = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.isActive) dispatch({ type: "UPDATE_DISPLAY" });
    }, 750);

    return () => clearInterval(interval);
  }, [state.isActive]);

  const handleMouseEnter = (index: number) => {
    dispatch({ type: "SET_HOVER", payload: { index, isHovered: true } });
  };

  const handleMouseLeave = (index: number) => {
    dispatch({ type: "SET_HOVER", payload: { index, isHovered: false } });
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      dispatch({ type: "SET_ACTIVE", payload: !document.hidden });
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
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
      <AnimatePresence
        onExitComplete={
          state.itemRemoved
            ? () => dispatch({ type: "HANDLE_EXIT_COMPLETE" })
            : undefined
        }
        initial={false}
      >
        {state.conceptsDisplay.map(({ name, icon: Icon, color, id }, idx) => (
          <motion.div
            className={`h-16 flex flex-col items-center group cursor-pointer`}
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
