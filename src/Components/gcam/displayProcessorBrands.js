import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
export default function DisplayProcessorBrands({processors}) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 w-full rounded-md p-5 shadow-2xl drop-shadow-2xl gap-14  font-thin shadow-2xl '>
    {
        Object.keys(processors).map(  (index) => {
        //console.log ( 'the brand is ', processors.index)
          return (
            <div key={index} value={processors[index].name} className=' group/item  grid grid-cols-2 gap-4 rounded-lg shadow-2xl drop-shadow-2xl '>
            
            <div className=''><Image src= { `/gcam/processors/${processors[index].name}.jpg` } width={200} height={200} /></div>
            <div className='grid gap-1'>
            <div className='text-3xl group-hover/item:underline underline-offset-2 transition delay-700 decoration-purple-700'>{processors[index].name}</div>
            <div className='DESCRIPTION invisible group-hover/item:visible underline underline-offset-2 transition delay-700 decoration-blue-600'> Download Google Camera for {processors[index].name} processor devices  </div>
            </div>
            </div>
          );
        })
    }
    </div>
  )
}

