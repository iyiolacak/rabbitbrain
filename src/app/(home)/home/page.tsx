"use client";
import { useUser } from "@clerk/clerk-react";
import React from "react";

const Home = () => {
  const { user } = useUser();

  const email = user?.primaryEmailAddress?.emailAddress || "No email found";
  const fullName = user?.fullName || "No name found";

  return (
    <div className="text-6xl">
      Currently logged in as {fullName || email}
    </div>
  );
};

export default Home;
