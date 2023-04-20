import React from 'react'
import {GiTrophyCup,GiTrapMask} from 'react-icons/gi'
import {TbMapSearch} from 'react-icons/tb'
import {IoSparklesSharp} from 'react-icons/io5'
const valorant = () => {
  return (
    <>
    <nav className='flex flex-wrap w-full bg-gray-700 text-white p-5 gap-3'>
    <span className='flex gap-2'><GiTrapMask className='self-center '/>Agents</span>
    <span className='flex gap-2'><TbMapSearch className='self-center '/> Maps</span>
    <span className='flex gap-2'> <IoSparklesSharp className='self-center '/>Skins</span>
    <span className='flex gap-2'> <GiTrophyCup className='self-center '/> Leaderboard </span>
    </nav>
    
    </>
  )
}

export default valorant