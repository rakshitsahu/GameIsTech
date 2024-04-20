import React from 'react'
import { useState } from 'react';
export default function HorizontalCarousel ({children : slides}) {

  
  const images = [
    '/sports/cricket/ipl/rr.png',
    '/sports/cricket/ipl/mi.png',
    '/sports/cricket/ipl/rcb.png',
    '/sports/cricket/ipl/k11p.png',
    '/sports/cricket/ipl/csk.png',
    // Add more image URLs as needed
  ];
  const [currIndex , setCurrentIndex] = useState(0)
  const goBackward = ()=> setCurrentIndex( ( currIndex + slides.length - 1 ) % slides.length )
  const goForward = ()=> setCurrentIndex( ( currIndex + slides.length + 1 ) % slides.length )
  return (
    <div className='relative overflow-hidden' >
    <div className={`flex transition-transform ease-out duration-500`} style={{transform: `translateX(-${currIndex * 100}%)`}} > {slides} </div>
    <div className='absolute inset-0 flex items-center justify-between'>
    <button onClick={()=> goBackward()}>
    L
    </button>
    <button onClick={()=> goForward()}>
    R
    </button>
    </div>
    </div>
  )
}
