import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type LogoProps = {
  size?: number;
  className?: string;
  monochrome?: false | "white" | "black";
  textSize?: "sm" | "md"
}

const Logo = ({ size = 36, className = '', monochrome = false, textSize = "md" }: LogoProps) => {
  const getLogoSrc = () => {
    switch(monochrome) {
      case "white":
        return '/white_rabbit.png';
      case "black":
        return '/black_rabbit.png';
      default:
        return '/orange_rabbit.png';
    }
  }
  const getTextColor = () => {
    switch(monochrome) {
      case "white":
        return 'text-white';
      case "black":
        return 'text-black';
      default:
        return 'text-black'; // For orange_rabbit.png, text is black by default
    }
  }
  const getTextSize = () => {
    switch(textSize) {
      case "sm":
        return 'text-lg';
      case "md":
        return 'text-2xl';
      default:
        return 'text-2xl'; // For orange_rabbit.png, text is black by default
    }
  }


  return (
    <Link href="/" className={`flex flex-row items-center space-x-1 cursor-pointer ${className}`}>
        <div 
          className="relative h-auto w-auto" 
          style={{ width: size, height: size }}
        >
          <Image
            src={getLogoSrc()}
            alt={`${monochrome || "orange"} rabbit`}
            fill
            // layout="fill"
            // objectFit="contain"
            className="rounded"
          />
        </div>
        <p className={cn("font-playful font-semibold select-none", getTextColor(), getTextSize())}>
          rabbitbrain
        </p>
    </Link>
  );
}

export default Logo;
