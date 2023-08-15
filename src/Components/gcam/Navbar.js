import React, { useState } from 'react'
import { useEffect } from 'react'
import {GiTrophyCup,GiTrapMask} from 'react-icons/gi'
import {TbMapSearch} from 'react-icons/tb'
import Link from 'next/link'
import {IoSparklesSharp} from 'react-icons/io5'
import axios from 'axios'
let thedata 


export default function Navbar({brands,developers}) {

  if(!brands)
  brands = []
  if(!developers)
  developers = []
  return (
    <nav className="sticky top-0 z-10 bg-white  backdrop-filter backdrop-blur-sm bg-opacity-30 border-b border-gray-200">
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        
        <div className="flex space-x-4 text-gray-900  font-semibold">
      
          <div className='group/item ' href="#">Devices
          <div className='bg-white rounded-2xl group/edit invisible group-edit/item:text-gray-700  group-hover/item:visible absolute'>
          <ul className='p-4 overflow-y-auto max-h-96'>
          {
            // console.log('the data found is ',brands)
            Object.keys(brands).map(  (index) => {
            return (
              
              <li key={index} id= {brands[index].name} className='p-3 border-b-4 hover:bg-blue-500 contrast-125 rounded-xl font-thin hover:text-white'>{brands[index].name}</li>


            );
          })
        }
          </ul>
          </div>
          </div>
          <div className='group/item ' href="#">Developers
          <div className=' rounded-2xl bg-white group/edit invisible group-edit/item:text-gray-700 group-hover/item:visible absolute'>
          <ul className='p-4 overflow-y-auto max-h-96'>
          {
            // console.log('the data found is ',brands)
            Object.keys(developers).map(  (index) => {
            return (
              
              <li key={index} id= {developers[index].name} className='p-3 border-b-4 hover:bg-blue-500 contrast-125 rounded-xl font-thin hover:text-white'>{developers[index].name}</li>


            );
          })
        }
          </ul>
          </div>
          </div>


        </div>
      </div>
    </div>
    </nav>
  )
}
