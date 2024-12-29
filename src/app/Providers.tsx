"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "convex/auth/react";
import React from "react";

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
""
const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
      <ConvexAuthProvider client={convex}>
        {children}
      </ConvexProviderWithClerk>
  );
};

export default Providers;
