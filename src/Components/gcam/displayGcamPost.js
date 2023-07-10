import React from 'react'
import { FcCameraIdentification , FcInfo , FcMultipleSmartphones } from "react-icons/fc";
import { MdOutlineDeveloperMode , MdDateRange } from "react-icons/md";
import {SiXdadevelopers} from "react-icons/Si"
import {GiProcessor} from "react-icons/gi"
import DisplayProcessors from '@/Components/gcam/displayProcessorsLogo'
export default function DisplayGcamForDevices({gcamPosts}) {
  const colors = ['from-pink-500 to-violet-500', 'from-green-500 to-violet-500' , 'from-violet-500 to-pink-500' 
  , 'from-pink-500 to-green-500' , 'from-violet-500 to-red-500' , 'from-violet-500 to-green-500'
]
let color = Math.floor(Math.random() * colors.length)
const test = `flex justify-center bg-black text-5xl font-extrabold drop-shadow-2xl rounded-3xl p-5 bg-clip-text text-transparent bg-gradient-to-r ${colors[color]} `
  return (
    <div className='flex flex-wrap justify-center w-full rounded-md p-3 shadow-2xl drop-shadow-2xl gap-7 '>
    {
        Object.keys(gcamPosts).map(  (index) => {
        //console.log ( 'the brand is ', brands.index)
          return (
            <div key={index} value={gcamPosts[index].name}  className='grid group/item bg-white rounded-3xl p-4'>

            <div  className={`flex justify-center bg-black text-xl font-extrabold drop-shadow-2xl rounded-3xl p-1 bg-clip-text text-transparent bg-gradient-to-r ${colors[color++ % colors.length]} `}>
             {gcamPosts[index].name } 
             </div>
             <font className='justify-self-center group-hover/item:visible invisible underline decoration-green-500 underline-offset-2 text-xs'>Gcam for {gcamPosts[index].name}</font>
            </div>
          );
        })
    }
    </div>
  )
}
