import React, { useReducer, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import conceptsList from "./concepts";
import ConceptDisplay from "./ConceptDisplay";
import { Brain } from "iconoir-react";

const MAX_ITEMS = 4;

export interface ConceptDisplay {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Type for the icon component
  color: string;
}

type State = {
  conceptsDisplay: Array<ConceptDisplay>;
  index: number;
  replacementIndex: number;
  itemRemoved: boolean;
  isActive: boolean;
  hoveredItems: { [key: string]: boolean };
};

type Action =
  | { type: "UPDATE_DISPLAY" }
  | { type: "SET_ITEM_REMOVED"; payload: boolean }
  | { type: "HANDLE_EXIT_COMPLETE" }
  | { type: "SET_HOVER"; payload: { id: string; isHovered: boolean } }
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
  hoveredItems: {},
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "UPDATE_DISPLAY":
      if (Object.values(state.hoveredItems).some(Boolean)) {
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
        hoveredItems: {
          ...state.hoveredItems,
          [action.payload.id]: action.payload.isHovered,
        },
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

  const handleMouseEnter = (id: string) => {
    dispatch({ type: "SET_HOVER", payload: { id, isHovered: true } });
  };

  const handleMouseLeave = (id: string) => {
    dispatch({ type: "SET_HOVER", payload: { id, isHovered: false } });
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      dispatch({ type: "SET_ACTIVE", payload: !document.hidden });
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full">
      <AnimatePresence
        onExitComplete={
          state.itemRemoved
            ? () => dispatch({ type: "HANDLE_EXIT_COMPLETE" })
            : undefined
        }
        initial={false}
      >
        {state.conceptsDisplay.map(({ name, icon: Icon, color, id }) => (
          <ConceptDisplay
            key={id}
            id={id}
            name={name}
            icon={Icon}
            color={color}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            isHovered={state.hoveredItems[id]}
            hoveredItems={state.hoveredItems}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

function generateUniqueId() {
  return Date.now() + Math.random().toString(36);
}

export default InfiniteCarousel;
