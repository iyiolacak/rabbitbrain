"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const LandingPage = () => {
  const router = useRouter();

  const handleSignUpCTA = () => router.push("/sign-up");
  return (
    <div className="w-full">
      <section className="w-full bg-black py-24">
        <div className="w-full container flex justify-center items-start">
          <div className="flex flex-col">
            <h1 className="text-white text-5xl font-semibold ">
              <span className="text-neutral-500">Stop Overthinking It.</span>
              <br />
              Start Training Your Brain Today.
            </h1>
            <Image
              src={"/orange_brain.webp"}
              alt="isolated orange brain illustration"
              width={380}
              height={380}
              className="mx-auto"
            />
            <div className="mt-10 mx-auto">
              <Button
                type="submit"
                disabled={false}
                className="w-full px-14 bg-primary transition-all"
                size={"lg"}
              >
                Hop in
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
