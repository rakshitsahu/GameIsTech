import React from 'react'
import Head from 'next/head'
import styles from './navbar.module.css'
import { useState } from 'react';
import { RiMenuUnfoldLine , RiMenuFoldLine  } from "react-icons/ri";
function Navbar() {
  const [hideNavbar , setHideNavbar] = useState(true)
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Teko"
          rel="stylesheet"
        />
      </Head>
      <div className='bg-blue-600 p-4 lg:sr-only md:sr-only xl:sr-only not-sr-only absolute w-screen top-0 left-0'>
      <button onClick={()=>{
        setHideNavbar(false)
      }}><RiMenuUnfoldLine className='text-white text-2xl'/></button>
      </div>
      <div className={`md:not-sr-only lg:not-sr-only xl:not-sr-only ${hideNavbar ? 'sr-only' : ''}`}>
      <nav  className='flex flex-col   
       md:h-auto md:w-screen 
      lg:h-auto lg:w-screen
      xl:w-screen xl:h-auto 
       h-screen w-1/2 text-xl 
       bg-blue-600  py-5 relative '  
       style={{ fontFamily: 'Teko, sans-serif' }}>
       <button  className='self-end mr-3 justify-self-end not-sr-only lg:sr-only xl:sr-only md:sr-only' 
       onClick={()=>{
        setHideNavbar(true)
       }}
       ><RiMenuFoldLine className='text-white text-2xl'/></button>
       <div className=' flex flex-col
       md:flex-row 
       lg:flex-row 
       xl:flex-row  
       justify-center gap-4 items-center
       '>
       <span> IPL</span>
       <span> Teams</span>
       <span> Team Stats</span>
       <span> Teams Comparison</span>
       <span> Player Stats</span>
       <span> Players Comparison</span>
       </div>
      </nav>
      </div>

    </>
    
  )
}

export default Navbar