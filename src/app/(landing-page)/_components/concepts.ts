import {
  Atom,
  Brain,
  CodeBrackets,
  DatabaseStats,
  Flask,
  Lock,
  Group,
  ShieldCheck,
  SigmaFunction,
} from "iconoir-react";

const conceptsList = [
  {
    name: "Brain Teasers",
    description: "Fun Puzzles to Sharpen Your Mind",
    icon: Brain,
    color: "#f497da", // Deep Amber
  },
  {
    name: "Math",
    description: "Tackle Numbers with Confidence",
    icon: SigmaFunction,
    color: "#6f9ceb", // Teal Green
  },
  {
    name: "Science",
    description: "Explore the World, One Concept at a Time",
    icon: Atom,
    color: "#007fff", // Deep Blue
  },
  {
    name: "Programming & AI",
    description: "Build your first smart AI—Step by Step",
    icon: CodeBrackets,
    color: "#6a0f49", // Royal Indigo
  },
  {
    name: "Data Science",
    description: "Turn Data into Simple Insights",
    icon: DatabaseStats,
    color: "#DC2626", // Crimson Red
  },
  {
    name: "Cybersecurity",
    description: "Keep Systems Safe in a Fun Way",
    icon: ShieldCheck,
    color: "#0891B2", // Dark Cyan
  },
  {
    name: "Chemistry",
    description: "Understand Reactions",
    icon: Flask,
    color: "#6e44ff", // Vivid Violet
  },
  {
    name: "Cryptography",
    description: "Unlock the Secrets of Secure Tech",
    icon: Lock,
    color: "#f4e409", // Burnt Orange
  },
  {
    name: "Psychology",
    description: "Learn What Makes Us Tick",
    icon: Group,
    color: "#c3423f", // Ruby Wine
  },
];

export default conceptsList;