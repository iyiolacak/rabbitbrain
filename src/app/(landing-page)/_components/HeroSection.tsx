"use client";
import HeroTitle from "./HeroTitle";
import { Button } from "@/components/ui/button";
import HeroBackgroundImage from "./HeroBackgroundImage";
import useNavigation from "@/app/hooks/useNavigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



const HeroSection = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/sign-up');
    router.prefetch('/sign-in');
    console.log("prefetched sign up and in")
  }, [router])
  // Single title with multiple lines
  const heroTitles: string[] = ["AI-Powered Challenges,", "Built by You."];
  const heroTitleWords: string[][] = heroTitles.map((line) => line.split(" "));

  const { navigateTo } = useNavigation();

  return (
    <section className="relative h-screen overflow-hidden">
      <HeroBackgroundImage />
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-between items-center h-full text-center px-4 py-16">
        <div className="relative">
          <h1 className="text-primary text-2xl sm:text-5xl xl:text-6xl font-serif font-semibold mt-6 leading-none lg:max-w-4xl">
            Mastermind Playground
            <br />
            <div className="flex justify-center">
              <HeroTitle title={heroTitleWords} />
            </div>
          </h1>
        </div>
        <Button
          onClick={() => navigateTo("/sign-up")}
          className="text-black
          bg-white px-8 py-4 text-sm tracking-tight rounded-full
          
          hover:bg-neutral-300 mb-20"
        >
          Hop In Now — It&apos;s Free
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
