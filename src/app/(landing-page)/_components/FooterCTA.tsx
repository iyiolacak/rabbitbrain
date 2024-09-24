import useNavigation from "@/app/hooks/useNavigation";
import { Button } from "@/components/ui/button";
import React from "react";

const FooterCTA = () => {
  const { navigateTo } = useNavigation();
  return (
    <section className="bg-orange-600 rounded-[6vh] py-10 md:py-16 text-center">
      <div className="px-4">
        <h2 className="text-white font-serif text-3xl md:text-5xl font-medium mb-6">
          We&apos;re here to learn by doing. Free.
        </h2>
        <p className="text-white text-lg mdtext-xl mb-8">
          Join the community and start building your own brain-busting
          challenges.
          <br />{" "}
          <span className="text-zinc-200">
            Join a community that&apos;s here to learn by doing.
          </span>
        </p>
      </div>
      <div className="flex md:flex-row flex-col w-min mx-auto">
        <Button
          onClick={() => navigateTo("/sign-up")}
          className="bg-white text-black font-medium px-8 py-4 text-md  rounded-full hover:bg-neutral-300"
        >
          Get Started Now
        </Button>
        <Button className="text-white" variant={"link"} disabled>
          How it works?
        </Button>
      </div>
    </section>
  );
};

export default FooterCTA;
