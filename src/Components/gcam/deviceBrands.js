import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import DisplayProcessors from './displayProcessorsLogo';
function DeviceBrands({brands}) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 w-full rounded-md p-5 shadow-2xl drop-shadow-2xl gap-14  font-thin shadow-2xl'>
    {
        Object.keys(brands).map(  (index) => {
        //console.log ( 'the brand is ', brands.index)
          return (
            <Link key={index} value={brands[index].name} href={`http://localhost:3000/apps/gcam/phones/${brands[index].name}`}>
            <div  className=' group/item  grid grid-cols-2 gap-4 rounded-lg shadow-2xl drop-shadow-2xl '>
            
            <div className=''><Image src= { `/gcam/phonebrands/${brands[index].name}.jpg` } width={200} height={200} /></div>
            <div className='grid gap-1'>
            <div className='text-3xl group-hover/item:underline underline-offset-2 transition delay-700 decoration-purple-700'>{brands[index].name}</div>
            <div className='flex'> <DisplayProcessors/> </div>
            <div className='DESCRIPTION invisible group-hover/item:visible underline underline-offset-2 transition delay-700 decoration-blue-600'> Download Google Camera for {brands[index].name} devices  </div>
            </div>
            
            </div>
            </Link>
            
          );
        })
    }

    </div>
  )
}

export default DeviceBrands