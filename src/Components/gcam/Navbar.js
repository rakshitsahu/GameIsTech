import React from 'react'
import {GiTrophyCup,GiTrapMask} from 'react-icons/gi'
import {TbMapSearch} from 'react-icons/tb'
import Link from 'next/link'
import {IoSparklesSharp} from 'react-icons/io5'
function Navbar() {
  return (
    <nav className='flex flex-wrap w-full bg-gray-700 text-white p-5 gap-3'>
    <Link href='http://localhost:3000/tracker/valorant/agents'> <span className='flex gap-2'> Gcam </span></Link>
   <Link href='http://localhost:3000/tracker/valorant/maps'> <span className='flex gap-2'> Developers </span></Link>
   <Link href='http://localhost:3000/tracker/valorant/skins'> <span className='flex gap-2'> Devices </span></Link>
   <Link href='http://localhost:3000/tracker/valorant/leaderboard'> <span className='flex gap-2'> Find For Device </span></Link>
    </nav>
  )
}

export default Navbar