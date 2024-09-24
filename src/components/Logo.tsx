import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type LogoProps = {
  size?: string; // tailwind size classes
  className?: string;
  monochrome?: false | "white" | "black";
  textSize?: string;
}

const Logo = ({ size = "9", className = '', monochrome = false, textSize = "text-2xl" }: LogoProps) => {
  const logoSrc = monochrome === "white"
    ? '/white_rabbit.png'
    : monochrome === "black"
    ? '/black_rabbit.png'
    : '/orange_rabbit.png'; // default

  return (
    <Link href="/" className={cn("flex items-center space-x-0.5 cursor-pointer", className)}>
      <div className={cn(size, "relative")}>
        <Image
          src={logoSrc}
          alt={`${monochrome || "orange"} rabbit`}
          fill
          className="rounded"
        />
      </div>
      <p
        className={cn(
          "font-playful font-semibold select-none",
          monochrome === "white" ? 'text-white' : 'text-black',
          textSize // tailwind text size
        )}
      >
        rabbitbrain
      </p>
    </Link>
  );
};

export default Logo;
