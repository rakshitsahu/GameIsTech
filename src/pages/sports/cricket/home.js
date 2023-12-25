import React from 'react'
import Navbar from './_components/navbar'
import styles from './cricket.module.css'
import SlidingImages from './_components/carousel'
import Carousel from './_components/carousel'
import Image from 'next/image'

function Cricket() {


  return (
    <>
      <Navbar className='w-fit' />
      <div>Cricket</div>
    <Carousel/>
    </>
  )
}

export default Cricket
