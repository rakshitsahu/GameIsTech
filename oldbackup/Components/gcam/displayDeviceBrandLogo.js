import React from 'react'
import Image from 'next/image'
export default function DisplayDeviceBrandLogo() {
  return (
    <div className='grid grid-cols-4  gap-1 '>
    <Image className='' src= { `/gcam/phonebrands/Asus.jpg` } width={30} height={30} />
    <Image className='' src= { `/gcam/phonebrands/Google.jpg` } width={30} height={30} />
    <Image className='' src= { `/gcam/phonebrands/Motorola.jpg` } width={30} height={30} />
    <Image className='' src= { `/gcam/phonebrands/Nokia.jpg` } width={30} height={30} />
    <Image className='' src= { `/gcam/phonebrands/Realme.jpg` } width={30} height={30} />
    <Image className='' src= { `/gcam/phonebrands/Samsung.jpg` } width={30} height={30} />
    <Image className='' src= { `/gcam/phonebrands/Vivo.jpg` } width={30} height={30} />
    <Image className='' src= { `/gcam/phonebrands/Xiaomi.jpg` } width={30} height={30} />
    </div>
  )
}
