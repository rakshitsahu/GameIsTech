import React from 'react'
import {GiTrophyCup,GiTrapMask} from 'react-icons/gi'
import {TbMapSearch} from 'react-icons/tb'
import Link from 'next/link'
import {IoSparklesSharp} from 'react-icons/io5'
function AdminNavbar() {
  console.log(process.env.local)
  return (
<>
<nav className="sticky top-0 z-10 bg-white  backdrop-filter backdrop-blur-sm bg-opacity-30 border-b border-gray-200">
<div className="max-w-5xl mx-auto px-4">
  <div className="flex items-center justify-between h-16">
    <span className="text-2xl text-gray-900 font-semibold">Logo</span>
    <div className="flex space-x-4 text-gray-900 blur-none">
    
      <div href="#">Dashboard
      <div className='absolute hidden'>
      <ul>
      <li>rakshit</li>
      <li>sahu</li>
      </ul>
      </div>
      </div>
      <div href="#">About</div>
      <div href="#">Projects</div>
      <div href="#">Contact</div>
    </div>
  </div>
</div>
</nav>

  <nav className=' sticky top-0 z-10 bg-white flex flex-wrap w-full  p-5 gap-3 bg-opacity-25 border-b font-thin'>
  <Link href='/apps/gcam/admin/dashboard'> <span className='flex gap-2'> Dashboard </span></Link>
 <Link href='/tracker/valorant/maps'> <span className='flex gap-2'> Posts </span></Link>
 <Link href='/apps/gcam/admin/create'> <span className='flex gap-2'> Create </span></Link>
 <Link href='/tracker/valorant/leaderboard'> <span className='flex gap-2'> Edit </span></Link>
  </nav>
  </>




  )
}

export default AdminNavbar