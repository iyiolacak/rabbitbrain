"use server";
import React from 'react'
import HomeNavbar from '../_components/HomeNavbar'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col'>
        <HomeNavbar/>
        {children}
        </div>
  )
}

export default HomeLayout