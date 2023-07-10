import React from 'react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import axios from 'axios'
import Navbar from '@/Components/gcam/Navbar'
import GcamColorfulPoster from '@/Components/gcam/gcamColorfulPoster'
export async function getStaticPaths(){
  const gcamJson = await axios.get('http://localhost:3000/api/gcam/gcam').then(response => {
    console.log(response.data)
    return response.data
  })
  const paths =  gcamJson.map((gcam) =>{
    return {
      params: {
        gcam : [gcam.developerName, gcam.name],
      },
    }
  })
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context){
  const gcamParams = context.params.gcam
    const data  = await axios.post(`http://localhost:3000/api/gcam/filtergcam`,{
      developerName: gcamParams[0],
      name : gcamParams[1]

  }).then(
      (result)=>{
        return result.data
      }
    )
    const developers = await axios.get('http://localhost:3000/api/gcam/developernames').then(response => {
      // console.log(response.data)
      return response.data
    })
    const brands = await axios.get('http://localhost:3000/api/gcam/phonebrands').then(response => {
      // console.log(response.data)
      return response.data
    })

    return {
      props :{
          data ,
          brands,
          developers
      }
    }
}
export default function GcamDownload({data , brands, developers}) {

  const GcamJson = data;
  return (
    <>
    <Navbar brands={brands} developers = {developers}/>
    Hello there page has been loaded successfully
    {console.log(GcamJson)}
    <GcamColorfulPoster gcams = {GcamJson} heading = {'developerName'}/>
    </>
  )
}