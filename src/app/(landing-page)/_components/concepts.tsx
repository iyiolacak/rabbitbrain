import {
    Brain,
    Code,
    SigmaFunction,
    Atom,
    // ShieldCheck,
    // Lock,
    DatabaseStats,
    Flask,
    BrainElectricity,
  } from "iconoir-react";
  
const width = 36;
const height = width;
export const concepts = [
  {
    name: "Brain Training",
    description: "Fun Puzzles to Sharpen Your Mind",
    icon: <Brain width={width} height={height} color="#F59E0B" />, // Orange
  },
  {
    name: "Math",
    description: "Tackle Numbers with Confidence",
    icon: <SigmaFunction width={width} height={height} color="#10B981" />, // Green
  },
  {
    name: "Science",
    description: "Explore the World, One Concept at a Time",
    icon: <Atom width={width} height={height} color="#3B82F6" />, // Blue
  },
  {
    name: "Programming & AI",
    description: "Build your first smart AI—Step by Step",
    icon: <Code width={width} height={height} color="#6366F1" />, // Indigo
  },
  {
    name: "Data Science",
    description: "Turn Data into Simple Insights",
    icon: <DatabaseStats width={width} height={height} color="#EF4444" />, // Red
  },
  // {
  //   name: "Cybersecurity",
  //   description: "Keep Systems Safe in a Fun Way",
  //   icon: <ShieldCheck width={width} height={height} color="#06B6D4" />, // Cyan
  // },
  {
    name: "Chemistry",
    description: "Understand Reactions",
    icon: <Flask width={width} height={height} color="#A855F7" />, // Purple
  },
  // {
  //   name: "Cryptography",
  //   description: "Unlock the Secrets of Secure Tech",
  //   icon: <Lock width={width} height={height} color="#F97316" />, // Orange
  // },
  {
    name: "Psychology & Behavior",
    description: "Learn What Makes Us Tick",
    icon: <BrainElectricity width={width} height={height} color="#F43F5E" />, // Pink
  },
];

export default concepts;