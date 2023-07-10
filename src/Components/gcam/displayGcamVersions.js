import Link from 'next/link'
import React from 'react'

export default function DisplayGcamVersions({gcamVersions, heading }) {

    const colors = ['from-pink-500 to-violet-500', 'from-green-500 to-violet-500' , 'from-violet-500 to-pink-500' 
   , 'from-pink-500 to-green-500' , 'from-violet-500 to-red-500' , 'from-violet-500 to-green-500'
]



    let color = Math.floor(Math.random() * colors.length)
    const test = `flex justify-center bg-black text-5xl font-extrabold drop-shadow-2xl rounded-3xl p-5 bg-clip-text text-transparent bg-gradient-to-r ${colors[color]} `
  return (
    <div className='flex flex-wrap justify-center w-full rounded-md p-3 shadow-2xl drop-shadow-2xl gap-7'>
    {
        Object.keys(gcamVersions).map(  (index) => {
        //console.log ( 'the brand is ', brands.index)
          return (
            <Link key={index} value={gcamVersions[index].name} href={`http://localhost:3000/apps/gcam/version/${gcamVersions[index].name}`}>
            <div  className='grid group/item bg-white rounded-full p-2'>
            {console.log( 'the heading is ',heading )}
            <div  className={`flex justify-center bg-black text-2xl font-extrabold drop-shadow-2xl rounded-3xl p-5 bg-clip-text text-transparent bg-gradient-to-r ${colors[color++ % colors.length]} `}>
             {gcamVersions[index][heading]}  
             </div>
             <div className='group-hover/item:visible text-xs invisible font-thin underline underline-offset-2 decoration-purple-600 p-3'>
             Download all Gcam {gcamVersions[index].name} ports
             </div>
            </div>
            </Link>
          );
        })
    }
    </div>
  )
  }
