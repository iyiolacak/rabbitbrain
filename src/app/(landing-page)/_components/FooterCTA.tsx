import useNavigation from "@/app/hooks/useNavigation";
import { Button } from "@/components/ui/button";
import React from "react";

const FooterCTA = () => {
  const { navigateTo } = useNavigation();
  return (
      <section className="bg-orange-600 rounded-[6vh] py-16 text-center">
        <div className="px-4">
          <h2 className="text-white font-serif text-3xl md:text-5xl font-medium mb-6">
            We&apos;re here to learn by doing. Free.
          </h2>
          <p className="text-white text-xl mb-8">
            Join the community and start building your own brain-busting
            challenges.<br/> Join a community that&apos;s here to learn by doing.
          </p>
        </div>
        <Button
          onClick={() => navigateTo("/sign-up")}
          className="bg-white text-orange-600 font-medium px-8 py-4 text-md tracking-tight rounded-full hover:bg-neutral-300"
        >
          Get Started Now
        </Button>
      </section>
  );
};

export default FooterCTA;
