import HeroTitle from "./HeroTitle";
import { Button } from "@/components/ui/button";
import HeroBackgroundImage from "./HeroBackgroundImage";
import useNavigation from "@/app/hooks/useNavigation";

const HeroSection = () => {
  // Single title with multiple lines
  const heroTitles: string[] = ["AI-Powered Challenges,", "Built by You."];
  const heroTitleWords: string[][] = heroTitles.map((line) => line.split(" "));

  const { navigateTo } = useNavigation();
  console.log(heroTitleWords);
  return (
    <section className="relative h-screen overflow-hidden">
      <HeroBackgroundImage />
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-between items-center h-full text-center px-4 py-16">
        <div className="relative inline-block">
          <h1 className="relative text-primary md:text-zinc-400 text-2xl sm:text-5xl xl:text-6xl font-serif font-semibold mt-6 leading-none lg:max-w-4xl ">
            Mastermind Playground
            <br />
            <div className="flex flex-row items-start">
              <div className="inline-flex items-center">
                <HeroTitle title={heroTitleWords} />
              </div>
            </div>
          </h1>
        </div>
        <Button
          onClick={() => navigateTo("/sign-up")}
          className="text-black backdrop-brightness-75 bg-white px-8 py-4 text-md tracking-tight rounded-full hover:bg-neutral-300 mb-20"
        >
          Hop In Now—It&apos;s Free!
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
