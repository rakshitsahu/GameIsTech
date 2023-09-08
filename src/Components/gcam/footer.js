import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className=' bottom-0 w-full  bg-gray-700 justify-items-center text-white gap-4 p-5'>
      <div className='DESCRIPTION flex flex-wrap font-light text-lg'>
        Thanks for visiting Game is tech. In this Application, we aim to provide the best <Link href='/apps/gcam'><span className='underline underline-offset-2 text-emerald-500'>Google Camera port</span></Link> for your device.  
        We have made powerful filters to find the most compatible Gcam for your device, and we are working on making it even better.

        After <span className='underline underline-offset-2 decoration-emerald-500'>celsoazevedo</span>, we are the best place to visit for Google Camera ports. Thanks again for visiting us.
      </div>

    </footer>
  )
}
