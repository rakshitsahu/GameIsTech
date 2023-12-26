import React, { useState } from 'react';
import Navbar from './_components/navbar';
import Carousel from './_components/carousel';

function Cricket() {
  const colors = ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400'];

  return (
    <>
      <Navbar />
      <div className='mx-auto m-3'>
        <div id='1' className='flex h-24 w-60 bg-black'>
        <Carousel>
        {colors.map((color, index) => (
          <div key={index} className={`flex-none ${color} h-24 w-60`}></div>
        ))}
        </Carousel>

        </div>
      </div>
    </>
  );
}

export default Cricket;
