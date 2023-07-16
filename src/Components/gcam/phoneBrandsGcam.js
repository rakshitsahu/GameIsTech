import React from 'react'
import { FcCameraIdentification , FcInfo , FcMultipleSmartphones } from "react-icons/fc";
import { MdOutlineDeveloperMode , MdDateRange } from "react-icons/md";
import {SiXdadevelopers} from "react-icons/Si"
import {GiProcessor} from "react-icons/gi"
import DisplayProcessors from '@/Components/gcam/displayProcessorsLogo'
import DisplayDeviceBrandLogo from './displayDeviceBrandLogo';
import Link from 'next/link';
export default function PhoneBrandsGcam({gcams, heading , prefix }) {
    const colors = ['from-pink-500 to-violet-500', 'from-green-500 to-violet-500' , 'from-violet-500 to-pink-500' 
   , 'from-pink-500 to-green-500' , 'from-violet-500 to-red-500' , 'from-violet-500 to-green-500'
]
    let prefixString = ''
    if (prefix) {
            prefixString = prefix
        }
    let color = Math.floor(Math.random() * colors.length)
   
    const test = `flex justify-center bg-black text-5xl font-extrabold drop-shadow-2xl rounded-3xl p-5 bg-clip-text text-transparent bg-gradient-to-r ${colors[color]} `
  return (
    <div className='flex flex-wrap justify-center w-full rounded-md p-5 shadow-2xl drop-shadow-2xl gap-14 '>
    {
        
        Object.keys(gcams).map(  (index) => {
        //console.log ( 'the brand is ', brands.index)
          return (
            <Link key={index} value={gcams[index].name} href={`http://localhost:3000/apps/gcam/phones/${gcams[index].brand.replaceAll(' ', '-' )}/${gcams[index].name.replaceAll(' ', '-' )}`} >
            <div key={index} value={gcams[index].name}  className='grid group/item bg-white rounded-3xl p-4'>
            {console.log( 'the heading is ',heading )}
             <table class="table-auto border-spacing-x-2.5 ">

                <tbody >
                    <tr>
                    <td className='font-mono text-2xl flex p-3'>Gcam Name <FcCameraIdentification className='m-1'/></td>
                    <td className='font-mono text-xl'>{gcams[index].name}</td>
                    
                    </tr>
                    <tr>
                    <td className='font-mono text-2xl flex p-3'>processor <MdOutlineDeveloperMode className='justify-self-center m-1'/></td>
                    <td className='font-mono text-xl'>{gcams[index].processor} <DisplayProcessors/></td>
                    </tr>
                    <tr>
                    <td className='font-mono text-2xl flex p-3'>Brand <FcInfo className='justify-self-center m-1'/></td>
                    <td className='font-mono text-xl'>{gcams[index].brand} <DisplayDeviceBrandLogo/></td>
                    </tr>
                    <tr >
                    <td className='font-mono text-2xl flex p-3'>Gcams <FcMultipleSmartphones className='text-rose-800 justify-self-center m-1'/></td>
                    <td> {  } </td>
                    </tr>
                </tbody>
                </table>

             
            </div>
            </Link>


          );
        })
    }
    </div>
  )
}

 