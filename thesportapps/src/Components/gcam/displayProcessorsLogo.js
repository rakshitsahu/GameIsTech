import React from 'react'
import { GiProcessor } from 'react-icons/gi';
import Image from 'next/image'
export default function DisplayProcessors() {
  return (

    <div className='grid grid-cols-4  gap-1 '>
    <Image className='' src= { `/gcam/processors/snapdragon.jpg` } width={30} height={30} />
    <Image className='' src= { `/gcam/processors/kirin.jpg` } width={30} height={30} />
    <Image className='' src= { `/gcam/processors/exynos.jpg` } width={30} height={30} />
    <Image className='' src= { `/gcam/processors/mediatek.jpg` } width={30} height={30} />
    </div>
    

  )
}