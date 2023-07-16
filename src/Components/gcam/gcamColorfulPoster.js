import React from 'react'
import { FcCameraIdentification , FcInfo , FcMultipleSmartphones } from "react-icons/fc";
import { MdOutlineDeveloperMode , MdDateRange } from "react-icons/md";
import {SiXdadevelopers} from "react-icons/Si"
import {GiProcessor} from "react-icons/gi"
import DisplayProcessors from '@/Components/gcam/displayProcessorsLogo'
import DisplayDeviceBrandLogo from './displayDeviceBrandLogo';
import Link from 'next/link';
export default function GcamColorfulPoster({gcams, heading , prefix , download }) {
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
            <Link key={index} value={gcams[index].name} href={`http://localhost:3000/apps/gcam/download/${gcams[index].developerName}/${gcams[index].name}`} >
            
            <div  className='grid group/item bg-white rounded-3xl p-4'>
            {console.log( 'the heading is ',heading )}
            <div  className={`flex justify-center bg-black text-5xl font-extrabold drop-shadow-2xl rounded-3xl p-5 bg-clip-text text-transparent bg-gradient-to-r ${colors[color++ % colors.length]} `}>
             {prefixString + gcams[index][heading] } 
             
          {console.log(gcams)}
             </div>
             <table class="table-auto border-spacing-x-2.5 ">

                <tbody >
                    <tr>
                    <td className='font-mono text-2xl flex p-3'>Gcam Name <FcCameraIdentification className='m-1'/></td>
                    <td className='font-mono text-xl'>{gcams[index].name}</td>
                    
                    </tr>
                    <tr>
                    <td className='font-mono text-2xl flex p-3'>Developer <MdOutlineDeveloperMode className='justify-self-center m-1'/></td>
                    <td className='font-mono text-xl'>{gcams[index].developerName}</td>
                    </tr>
                    <tr>
                    <td className='font-mono text-2xl flex p-3'>Version <FcInfo className='justify-self-center m-1'/></td>
                    <td className='font-mono text-xl'>{gcams[index].version}</td>
                    </tr>
                    <tr>
                    <td className='font-mono text-2xl flex p-3'>Date <MdDateRange className='text-green-500 justify-self-center  m-1'/></td>
                    <td className='font-mono text-xl'>{gcams[index].releaseDate}</td>
                    </tr>
                    <tr>
                    <td className='font-mono text-2xl flex p-3'>XDA Thread <SiXdadevelopers className='text-green-500 justify-self-center m-1'/></td>
                    <td className='font-mono text-xl'>{gcams[index].xdaThread && 'YES'}</td>
                    </tr>
                    <tr className='mt-2'>
                    <td className='font-mono text-2xl flex p-3'>Processors <GiProcessor className='text-rose-800 justify-self-center m-1'/></td>
                    <td><DisplayProcessors/></td>
                    </tr>
                    <tr >
                    <td className='font-mono text-2xl flex p-3'>Brands <FcMultipleSmartphones className='text-rose-800 justify-self-center m-1'/></td>
                    <td><DisplayDeviceBrandLogo/></td>
                    </tr>
                </tbody>
                </table>
                {
                  download &&
                  <div className='m-2 grid items-center justify-items-center'>
                  <center><div className='font-mono text-2xl flex p-3'> description</div></center>
                  <div className='flex flex-grow-0'>{gcams[index].description}</div>
                  </div>
                }
                {
                  download &&
                  <center> <button hr className='bg-purple-500 active:bg-purple-800 hover:ring-2 rounded-r-full rounded-l-full p-4 text-white'>
                  
                  <a target="_blank" class="fcc-btn" href="https://www.freecodecamp.org/">Download</a> 
                  </button> </center>     
                }        
            </div>
            </Link>

          );
        })
    }
    </div>
  )
}

 