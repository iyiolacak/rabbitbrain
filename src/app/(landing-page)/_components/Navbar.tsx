import Logo from '@/components/Logo'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='w-full bg-zinc-900 shadow-md'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex-shrink-0'>
            <Link href="/">
              <Logo monochrome="white" textSize='sm' size={28}/>
            </Link>
          </div>
          <div className='hidden sm:block'>
            <div className='ml-10 flex items-baseline space-x-4'>
              <Link href="/challenges" className='text-gray-300 hover:bg-zinc-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                Challenges
              </Link>
              <Link href="/topics" className='text-gray-300 hover:bg-zinc-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                Topics
              </Link>
              <Link href="/about" className='text-gray-300 hover:bg-zinc-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                About
              </Link>
              <a href="https://github.com/yourusername/rabbitbrain" target="_blank" rel="noopener noreferrer" className='text-gray-300 hover:bg-zinc-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                GitHub
              </a>
            </div>
          </div>
          <div className='hidden sm:block'>
            <Button>
              Start Learning
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar