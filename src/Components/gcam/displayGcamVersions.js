import { Tooltip } from "@nextui-org/react";
import Link from 'next/link';

export default function DisplayGcamVersions({gcamVersions, heading }) {

  if(!gcamVersions)
  gcamVersions = true
    const colors = ['from-pink-500 to-violet-500', 'from-green-500 to-violet-500' , 'from-violet-500 to-pink-500' 
   , 'from-pink-500 to-green-500' , 'from-violet-500 to-red-500' , 'from-violet-500 to-green-500'
]



    let color = Math.floor(Math.random() * colors.length)
    const test = `flex justify-center bg-black text-5xl font-extrabold drop-shadow-2xl rounded-3xl p-5 bg-clip-text text-transparent bg-gradient-to-r ${colors[color]} `
  return (
    <div className='flex flex-wrap justify-center w-full rounded-md p-3 shadow-2xl drop-shadow-2xl gap-2'>
    {
        Object.keys(gcamVersions).map(  (index) => {
          return (
            <Link key={index} value={gcamVersions[index]} href={`/apps/gcam/version/${gcamVersions[index]}`.toLowerCase()}>
            <Tooltip className='bg-blue-600 rounded-full text-white' content= {`Gcam ${gcamVersions[index]}`}>
            <div  className='flex group/item bg-white rounded-r-full rounded-l-full p-1'>

            <div  className={`flex justify-center bg-black font-extrabold drop-shadow-2xl rounded-3xl p-2 bg-clip-text text-transparent bg-gradient-to-r ${colors[color++ % colors.length]} `}>
             {gcamVersions[index]}  
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
