import Image from 'next/image';
import React from 'react'

type LogoProps = {
  size?: number
  className?: string;
}

const Logo = ({ size, className }: LogoProps) => {
  return (
    <div className='flex flex-row items-center space-x-1'>
      <Image
      src={"/orange_rabbit.png"}
      alt="orange rabbit"
      width={size}
      height={size}
      className='size-7'
      />
      <p className='font-playful font-semibold text-xl'>
      rabbitbrain
      </p>
    </div>
  )
}

export default Logo