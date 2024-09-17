import useNavigation from "@/app/hooks/useNavigation";
import { Button } from "@/components/ui/button";
import React from "react";

const FooterCTA = () => {
  const { navigateTo } = useNavigation();
  return (
    <>
      <section className="bg-orange-600 py-16 text-center">
        <div className="px-4">
          <h2 className="text-white font-serif text-3xl md:text-4xl font-medium mb-6">
            Ready to Create Your Own Challenge?
          </h2>
          <p className="text-white text-lg mb-8">
            Join the community and start building your own brain-busting
            challenges.
          </p>
        </div>
        <Button
          onClick={() => navigateTo("/sign-up")}
          className="bg-white text-orange-600 font-medium px-8 py-4 text-md tracking-tight rounded-full hover:bg-neutral-300"
        >
          Get Started Now
        </Button>
      </section>
    </>
  );
};

export default FooterCTA;
