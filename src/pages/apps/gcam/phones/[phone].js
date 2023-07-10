import React from 'react'
import axios from 'axios'
import Navbar from '@/Components/gcam/Navbar'
import PhoneBrandsGcam from '@/Components/gcam/phoneBrandsGcam'
import GcamColorfulPoster from '@/Components/gcam/gcamColorfulPoster'
export async function getStaticPaths(){
    const res  = await axios.get('http://localhost:3000/api/gcam/phonebrands').then(
        (result)=>{
          return result.data
        }
      )
    //   console.log( 'gcam versions are', res)
      const paths = res.map( (element)=>{
        return {
            params:{
            phone : element.name,
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
    const phone = context.params.phone
    console.log(' data of static props is', phone)
    const data  = await axios.post(`http://localhost:3000/api/gcam/filtergcampost`,{
      brand : phone
    }).then(
        (result)=>{
          return result.data
        }
      )
      console.log('the data is ',data)
      const developers = await axios.get('http://localhost:3000/api/gcam/developernames').then(response => {
        console.log(response.data)
        return response.data
      })
      const brands = await axios.get('http://localhost:3000/api/gcam/phonebrands').then(response => {
        console.log(response.data)
        return response.data
      })
      console.log('the data is ',data)

      return {
        props :{
            data, 
            phone,
            brands,
            developers
        }
      }
}
export default function Phones({data, phone , brands, developers}) {
    const GcamJson = data;
    console.log( 'post data is' , GcamJson)
  return (
    <>
    <Navbar brands={brands} developers = {developers}/>
    <center><h1 className='text-3xl font-thin'> Download Google Camera Ports for {phone} Devices</h1></center>
    {console.log(GcamJson)}
    {phone}
    <PhoneBrandsGcam gcams = {GcamJson} heading = {'Xiaomi'}/>
    </>
  )
}
