import Logo from '@/components/Logo'
import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full bg-zinc-900'>
        <div className='flex justify-center p-2.5 max-w-lg'>
        <Logo monochrome={"white"} textSize='sm' size={28}/>
        </div>
        </div>
  )
}

export default Navbar