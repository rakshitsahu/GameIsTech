import React from 'react'
import {GiTrophyCup,GiTrapMask} from 'react-icons/gi'
import {TbMapSearch} from 'react-icons/tb'
import Link from 'next/link'
import {IoSparklesSharp} from 'react-icons/io5'
function Navbar() {
  return (
    <nav className='flex flex-wrap w-full bg-gray-700 text-white p-5 gap-3'>
    <Link href='/tracker/valorant/agents'><span className='flex gap-2'>   <GiTrapMask className='self-center '/>Agents</span></Link>
   <Link href='/tracker/valorant/maps'> <span className='flex gap-2'> <TbMapSearch className='self-center '/> Maps </span></Link>
   <Link href='/tracker/valorant/skins'> <span className='flex gap-2'>  <IoSparklesSharp className='self-center '/>Skins </span></Link>
   <Link href='/tracker/valorant/leaderboard'> <span className='flex gap-2'>  <GiTrophyCup className='self-center '/> Leaderboard  </span></Link>
    </nav>
  )
}

export default Navbar