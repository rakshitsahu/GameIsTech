import React from 'react'
import axios from 'axios'
import Navbar from '@/Components/gcam/Navbar'

import GcamColorfulPoster from '@/Components/gcam/gcamColorfulPoster'
export async function getStaticPaths(){
    const res  = await axios.get('http://localhost:3000/api/gcam/gcamversion').then(
        (result)=>{
          return result.data
        }
      )
    //   console.log( 'gcam versions are', res)
      const paths = res.map( (element)=>{
        return {
            params:{
            version : element.name,
        },
    }
      })
      console.log( 'paths are' , paths )
      return {
        paths ,
        fallback: 'blocking'
      }
}

export async function getStaticProps(context){
    // const data = {
    //     name : 'hello'
    // }
    // console.log('working till heere')
    const version = context.params.version
    console.log(' data of static props is', version)
    const data  = await axios.post(`http://localhost:3000/api/gcam/filtergcam`,{
        version: 13
    }).then(
        (result)=>{
          return result.data
        }
      )
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
            data ,
            brands,
            developers
        }
      }
}
export default function Version({data , brands, developers}) {
  const GcamJson = data;
  return (
    <>
    <Navbar brands={brands} developers = {developers}/>
    {console.log(GcamJson)}
    <GcamColorfulPoster gcams = {GcamJson} heading = {'name'}/>
    </>
  )
}
