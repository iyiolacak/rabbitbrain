import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type LogoProps = {
  size?: number;
  className?: string;
}

const Logo = ({ size = 36, className = '' }: LogoProps) => {
  return (
    <Link href="/" className={`flex flex-row items-center space-x-1 cursor-pointer ${className}`}>
        <div 
          className="relative h-auto w-auto" 
          style={{ width: size, height: size }}
        >
          <Image
            src="/orange_rabbit.png"
            alt="orange rabbit"
            layout="fill"
            objectFit="contain"
            className="rounded"
          />
        </div>
        <p className="font-playful font-semibold text-2xl text-black select-none">
          rabbitbrain
        </p>
    </Link>
  );
}

export default Logo;
