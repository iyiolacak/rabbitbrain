import type { Metadata } from "next";
import { Lora as FontSerif } from "next/font/google";
import { Quicksand as FontPlayful } from "next/font/google";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Providers from "@/app/Providers";

// Import Merriweather (serif font)
const fontSerif = FontSerif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
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
  title: "rabbitbrain · Rethink learning – free.",
  description:
    "Stop wasting time on outdated methods. rabbitbrain gives you the tools to learn faster, think smarter, and master anything – for free. No subscriptions, no limits, just results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable, // Use the sans-serif font
            fontSerif.variable, // Include the serif font variable
            fontPlayful.variable // Include the serif font variable

          )}
        >
          {children}
        </body>
      </html>
    </Providers>
  );
}