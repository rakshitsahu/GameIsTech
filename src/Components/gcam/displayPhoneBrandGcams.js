import {BsReddit , BsTelegram , BsCamera2} from 'react-icons/bs'
import { SiXdadevelopers } from "react-icons/si"
import React from 'react'
import Link from 'next/link'
import { Tooltip } from '@nextui-org/react'
export default function DisplayPhoneBrandGcams({phoneData}){
    console.log('phonedata is', phoneData)
    console.log(Object.keys(phoneData[0]))
    const colors = ['from-pink-500 to-violet-500', 'from-green-500 to-violet-500' , 'from-violet-500 to-pink-500' 
   , 'from-pink-500 to-green-500' , 'from-violet-500 to-red-500' , 'from-violet-500 to-green-500'
]
    let color = Math.floor(Math.random() * colors.length)
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-3 justify-center w-full rounded-md p-3 shadow-2xl drop-shadow-2xl '>
    {
        Object.keys(phoneData[0].data).map(  (index) => {
          let phoneBrand = phoneData[0].phoneBrand.replaceAll('/','%2F').replaceAll(' ','-')
          let phoneName = phoneData[0].data[index].phoneName.replaceAll('/','%2F').replaceAll(' ','-')
        //console.log ( 'the brand is ', brands.index)
          return (
            <Link key={index} value={phoneData[0].phoneName} href={`/apps/gcam/phones/${phoneBrand}/${phoneName}`}>
            <Tooltip className='bg-purple-600 rounded-full text-white' content= {`Gcam for ${phoneData[0].data[index].phoneName}`}>
            <div  className='grid grid-rows-2  group/item bg-white rounded-r-full rounded-l-full p-4'>

            <div  className={`flex flex-wrap justify-center text-lg bg-black font-extrabold drop-shadow-2xl rounded-3xl p-3 bg-clip-text text-transparent bg-gradient-to-r ${colors[color++ % colors.length]} `}>
             {phoneData[0].data[index].phoneName}  
             </div>

             <div className='grid grid-cols-4 justify-items-center p-3'>
             {
              Object.keys(phoneData[0].data[index].source).map(  (index) => {
              //console.log ( 'the brand is ', brands.index)
                return (
                  <div key = {index} className=''>
                  { index === 'reddit' && <BsReddit className='text-orange-400' />}
                  { index === 'telegram' && <BsTelegram className='text-sky-400' /> }
                  { index === 'xda' && <SiXdadevelopers className='text-red-400' /> }
                  { index === 'official' && <BsCamera2 className='text-emerald-400' /> }
                  </div>
                );
              })
              }
             </div>
            </div>
            </Tooltip>
            </Link>
          );
        })
    }
    </div>
  )
  
}