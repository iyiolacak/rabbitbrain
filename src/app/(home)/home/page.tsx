"use client";
import { useUser } from '@clerk/clerk-react'
import React from 'react'

const Home = () => {
  const user = useUser()
  return (
    <div className='text-6xl'>Welcome {user.user?.primaryEmailAddress}.</div>
  )
}

export default Home