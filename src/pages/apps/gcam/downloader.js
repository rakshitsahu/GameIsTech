import React from 'react'
import axios from 'axios'
import Navbar from '@/Components/gcam/Navbar'
export async function getStaticProps(){
    // const data = {
    //     name : 'hello'
    // }
    // console.log('working till heere')

      const developers = await axios.get('http://localhost:3000/api/gcam/developernames').then(response => {
        console.log(response.data)
        return response.data
      })
      const brands = await axios.get('http://localhost:3000/api/gcam/phonebrands').then(response => {
        console.log(response.data)
        return response.data
      })

      return {
        props :{
            brands,
            developers
        }
      }
}
export default function Downloader({brands,developers}) {
    
  return (
    <>
    <Navbar brands={brands} developers = {developers}/>
    
    
    <div className=' m-3 drop-shadow-2xl shadow-2xl rounded-3xl bg-white'>
    <center><h1 className='font-thin text-3xl'> Welcome the Powerful Google Camera Port downloader </h1></center>
    <center><h1 className='font-mono text-xl mt-3'> Having trouble in searching the best fit Gcam for your device? here we have built
       the strong filter. Use the appropriate filter ffor the best result. </h1></center>
    <center><h1 className='font-mono mt-3 underline decoration-red-600 underline-offset-2'> I am still working on this 
    feature to make it
     more robust </h1></center>
    <div className='DEVELOPERS m-3'> 
    
    </div>
    </div>
    </>
    
  )
}
