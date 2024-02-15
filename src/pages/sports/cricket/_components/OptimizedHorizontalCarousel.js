import React, { useRef } from 'react'
import { useState } from 'react';

/*
how to use ?
<div id='2' className='flex h-64 w-60 bg-black mt-2'>
  <OptimizedVerticalCarousel >
    make sure to use flex-none on children
    <div key={index} className={`flex-none ${color} h-64 w-60`}></div>
  </OptimizedVerticalCarousel>
</div>
*/




export default function OptimizedVerticalCarousel ({children : slides }) {
  // console.log(slides)
  
  const [currIndex , setCurrentIndex] = useState(0)
  const [sliding , setSliding] = useState(false)
  const [ children , setChildren ] = useState(slides.slice(0 , slides.length - 1))
  const [ screenChildren , setScreenChildren ] = useState(slides.slice(slides.length - 1))
  const slidingRef = useRef()
  const handleSlide = (direction)=>{
    if(sliding)
    return ;
    setSliding(true)
    
    let nextElementIndex = direction == -1 ? 0 : children.length - 1
    let nextElement  = children[nextElementIndex]
    if( direction == -1 ){
      setChildren( [...children.slice(1 , children.length) , ...screenChildren])
      setScreenChildren([ nextElement, ...screenChildren])

      slidingRef.current.classList.remove('transition-transform', 'ease-out', 'duration-500');
      setCurrentIndex( 1 )
      setTimeout(() => {
        slidingRef.current.classList.add('transition-transform', 'ease-out', 'duration-500');
        setCurrentIndex( 0 )
        setTimeout( ()=>{
          setScreenChildren([nextElement])
           slidingRef.current.classList.remove('transition-transform', 'ease-out', 'duration-500');
           setSliding(false)
          // setCurrentIndex( 0 )
        } , 500 )
      }, 0);
    }
    else{
      setChildren( [...screenChildren , ...children.slice(0 , children.length - 1)])
      setScreenChildren([...screenChildren , nextElement])
      slidingRef.current.classList.add('transition-transform', 'ease-out', 'duration-500');
      setCurrentIndex( 1)
      setTimeout( ()=>{
        setScreenChildren([nextElement])
         slidingRef.current.classList.remove('transition-transform', 'ease-out', 'duration-500');
        setCurrentIndex(0 )
        setSliding(false)
      } , 500 )
    }


  }
  const goBackward = ()=> {

    handleSlide(-1)
  }
  const goForward = ()=> {
    try{
      
      handleSlide(1)
    }
    catch(e){
      console.error("Error occured is ", e.message)
    }
  }
  return (
    <div className='relative overflow-hidden flex-none' >
    <div ref={slidingRef} className={`flex `} style={{transform: `translateX(-${currIndex * 100}%)`}} > {screenChildren} </div>
    <div className='absolute inset-0 flex items-center justify-between text-red-500 md:text-black lg:text-emerald-600 xl:text-cyan-600'>
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
