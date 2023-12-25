import React from 'react'
export default function Carousel ({children : slides}) {
  const images = [
    '/sports/cricket/ipl/rr.png',
    '/sports/cricket/ipl/mi.png',
    '/sports/cricket/ipl/rcb.png',
    '/sports/cricket/ipl/k11p.png',
    '/sports/cricket/ipl/csk.png',
    // Add more image URLs as needed
  ];
  return (
    <div className=' max-w-[1400px] justify-center h-[780px] w-full m-auto relative bg-red-500' >
    {images.map((src, index) => (
      <span key={index} className=' flex justify-center bg-green-400 w-full h-full my-1'>
      <img className='' src={src}/>
      </span>
    ))}
    </div>
  )
}
