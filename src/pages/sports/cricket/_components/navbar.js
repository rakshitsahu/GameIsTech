import React from 'react'
import Head from 'next/head'
import styles from './navbar.module.css'
import { useState } from 'react';
import { RiMenuUnfoldLine , RiMenuFoldLine  } from "react-icons/ri";
import Link from 'next/link';
function Navbar() {
  const [hideNavbar , setHideNavbar] = useState(true)
  return (
    <>
      <div className='bg-blue-600 p-4 lg:sr-only md:sr-only xl:sr-only not-sr-only relative w-screen top-0 left-0'>
        <button onClick={() => setHideNavbar(!hideNavbar)}>
          {hideNavbar ? (
            <RiMenuUnfoldLine className='text-white text-2xl' />
          ) : (
            <RiMenuFoldLine className='text-white text-2xl' />
            
          )}
        </button>
      </div>
      <nav
        className={`md:flex lg:flex xl:flex ${
          hideNavbar ? 'hidden' : 'flex'
        } flex-col overflow-clip md:h-auto md:w-screen lg:h-auto lg:w-screen xl:h-auto xl:w-screen h-screen w-full text-xl bg-blue-600 py-5 relative`}
        style={{ fontFamily: 'Teko, sans-serif' }}
      >
        <button
          className='self-end mr-3 justify-self-end sr-only'
          onClick={() => {
            setHideNavbar(true);
          }}
        >
          <RiMenuFoldLine className='text-white text-2xl' />
        </button>
        <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row justify-center gap-4 items-center text-white'>
          <span> IPL</span>
          <span> Teams</span>
          <span > <Link href={`/sports/cricket/ipl/stats`}>Stats</Link></span>
          <span> Teams Comparison</span>
          <span> Player Stats</span>
          <span> Players Comparison</span>
        </div>
      </nav>
    </>
    
  )
}

export default Navbar