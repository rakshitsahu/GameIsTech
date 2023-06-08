import React from 'react'
import {GiTrophyCup,GiTrapMask} from 'react-icons/gi'
import {TbMapSearch} from 'react-icons/tb'
import Link from 'next/link'
import {IoSparklesSharp} from 'react-icons/io5'
function AdminNavbar() {
  return (
    <nav className='flex flex-wrap w-full bg-gray-700 text-white p-5 gap-3'>
    <Link href='http://localhost:3000/tracker/valorant/agents'> <span className='flex gap-2'> Dashboard </span></Link>
   <Link href='http://localhost:3000/tracker/valorant/maps'> <span className='flex gap-2'> Posts </span></Link>
   <Link href='http://localhost:3000/apps/gcam/admin/create'> <span className='flex gap-2'> Create </span></Link>
   <Link href='http://localhost:3000/tracker/valorant/leaderboard'> <span className='flex gap-2'> Edit </span></Link>
    </nav>
  )
}

export default AdminNavbar