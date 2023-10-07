import React from 'react'
import colorfulHeadingPoster from '@/pages/api/gcam/colorfulHeadingPoster';
export default function DisplayGcams({gcams}) {
  return (
    <div className='grid grid-cols-3 bg-white h-screen m-3 justify-center  rounded-3xl shadow-2xl drop-shadow-2xl'>
    {console.log(gcams)}
    {
        Object.keys(gcams).map(  (index) => {
            //console.log ( 'the brand is ', brands.index)
              return (
    
                <div key={index} value={gcams[index]}>{gcams[index].name}</div> 
                
    
              );
            })
    }
    </div>

  )
}

 