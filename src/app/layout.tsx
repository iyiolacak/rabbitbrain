import type { Metadata } from "next";
import { Libre_Baskerville as FontSerif } from "next/font/google";
import { JetBrains_Mono as FontMono } from "next/font/google";
import { Quicksand as FontPlayful } from "next/font/google";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ConvexClientProvider } from "@/app/ConvexAuthProvider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

// Import Merriweather (serif font)
const fontSerif = FontSerif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
});
const fontMono = FontMono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

const fontPlayful = FontPlayful({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-playful",
});

// Import Inter (sans-serif font)
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "rabbitbrain · For thinkers who break the mold",
  description:
// metadata
    "Rabbitbrain turns challenges into obsession. Crack riddles, master puzzles, and create brain-twisting levels that push the limits of logic, math, and creativity. This isn’t just learning—it’s leveling up. Dive in and dominate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable, // Use the sans-serif font
            fontSerif.variable, // Use the serif font
            fontPlayful.variable, // Use the playful font
            fontMono.variable // Use the monospace font for code
          )}
        >
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
