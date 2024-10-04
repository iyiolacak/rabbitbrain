"use client";
import { useUser } from "@clerk/clerk-react";
import React from "react";

const Home = () => {
  const { user } = useUser();
  
  const email = user?.primaryEmailAddress?.emailAddress;
  const fullName = user?.fullName;

  return (
    <>
      <div className="text-6xl">
        Currently logged in as {fullName || email || "a guest"}
      </div>
    </>
  );
};

export default Home;
