import React from 'react'
import axios from 'axios'
import Navbar from '@/Components/gcam/Navbar'
import PhoneBrandsGcam from '@/Components/gcam/phoneBrandsGcam'
import GcamColorfulPoster from '@/Components/gcam/gcamColorfulPoster'
import { ObjectId } from 'mongodb'
export async function getStaticPaths(){
  const gcamPosts = await axios.get('http://localhost:3000/api/gcam/getgcamposts').then(response => {
    // console.log(response.data)
    return response.data
  })
  const paths =  gcamPosts.map((post) =>{
    return {
      params: {
        phone : [post.brand.replaceAll(" ", "-"), post.name.replaceAll(" ", "-")],
      },
    }
  })
  console.log('the paths are ' , paths)
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context){
  console.log('working here')
  const phone = context.params.phone
  // console.log('working here',phone[0], phone[1])
  const brand = phone[0].replaceAll("-", " ");
  const device = phone[1].replaceAll("-", " ");
  
    const data  = await axios.post(`http://localhost:3000/api/gcam/filtergcampost`,{
      name : device,
      brand : brand,
  }).then(
      (result)=>{
        // console.log('result found is',result.data)
        return result.data
      }
    )
    var gcamJson
    if(data.length > 0){
      const objectIds = data[0].gcamIds
      console.log( 'the object ids are', objectIds)
      const documentIds = objectIds.map(function(myId) { return new ObjectId(myId); })
       gcamJson = await axios.post(`http://localhost:3000/api/gcam/filtergcampost`,{_id: {$in: documentIds }}).then(
        (result)=>{
          // console.log('result found is',result.data)
          return result.data
        }
      )
    }
    


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
          gcamJson,
          brands,
          developers
      }
    }
}
export default function GcamDownloadForPhone({data,gcamJson , brands,developers}) {
  const gcam = data[0]
  return (
    <>
    {console.log(gcamJson)}
    <Navbar brands={brands} developers={developers}/>
    <article className='grid justify-items-center'>
    <h1 className='text-3xl font-thin mt-3'> Download Google Camera Ports For {gcam.name} </h1>
    <div> Download</div>
    </article>
    </>
  )
}
