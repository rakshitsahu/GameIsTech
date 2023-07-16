import React from 'react'
import axios from 'axios'
import Navbar from '@/Components/gcam/Navbar'
import PhoneBrandsGcam from '@/Components/gcam/phoneBrandsGcam'
import GcamColorfulPoster from '@/Components/gcam/gcamColorfulPoster'
import DisplayDevelopers from '@/Components/gcam/displayDevelopers'
import DisplayGcamVersions from '@/Components/gcam/displayGcamVersions'
import { GCAM_GET_REQUEST } from '@/Components/API/API_Manager'
import GCAM_API_STATE from '@/Components/API/API_States'
import Head from 'next/head'
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

  // console.log('the paths are ' , paths)
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context){
  // console.log('working here')
  const phone = context.params.phone
  // console.log('working here',phone[0], phone[1])
  const phoneBrand = phone[0].replaceAll("-", " ");
  const phoneModel = phone[1].replaceAll("-", " ");
  
    const data  = await axios.post(`http://localhost:3000/api/gcam/filtergcampost`,{
      name : phoneModel,
      brand : phoneBrand,
  }).then(
      (result)=>{
        // console.log('result found is',result.data)
        return result.data
      }
    )
    console.log('data found is', data)
    const gcamJson = await axios.post(`http://localhost:3000/api/gcam/filtergcam`, { downloadLink : {$in : data[0].gcams} } ).then(
      (result)=>{
        // console.log('result found is',result.data)
        return result.data
      }
    )
    phone[0].replaceAll('-',' ')
    phone[1].replaceAll('-',' ')
    console.log( 'data found after request is', gcamJson)
    const gcamVersions = await GCAM_GET_REQUEST(GCAM_API_STATE.GcamVersions)
    const developers = await GCAM_GET_REQUEST(GCAM_API_STATE.DeveloperNames)
    const brands = await GCAM_GET_REQUEST(GCAM_API_STATE.PhoneBrands)
    const genericGcams = await GCAM_GET_REQUEST(GCAM_API_STATE.Generic)

    return {
      props :{
          data ,
          gcamJson,
          phoneBrand,
          phoneModel,
          brands,
          developers,
          gcamVersions,
          genericGcams
      }
    }
}
export default function GcamDownloadForPhone({data , genericGcams , gcamJson, phoneBrand, phoneModel, brands,developers,gcamVersions}) {
  const gcam = data[0]
  console.log('gcam json is', data)
  const GcamDescription = `If you are looking for working Gcam for ${phoneModel}. 
   You are at the best place. we have variety of Google Camera Ports.
   With excellent filters which will help you to find out the most compatible Google Camera for ${phoneModel}
   in no time.`
   const GenericGcamDescription = `Generic Gcams are compatible with most of the devices.
    Make sure you checkout Gcam ports in ${phoneModel}. 
   Before downloading, verify the compatibility from the Google Camera description with ${phoneModel} features.`
   const description = `Download Gcam for ${phoneModel}. We also have generic Google Camera ports which could work in ${phoneModel}.`
   const title = `Gcam for ${phoneModel} | Google Camera Ports`
   function addPageInfo() {
     return {
       __html: `
       {
         "@context": "https://schema.org/",
         "@type": "Product",
         "name": "Google Camera Ports",
     
         "description": ${description} ,
         "brand": {
           "@type": "Brand",
           "name": "Gcam APK"
         }
         ,
           "author": {
             "@type": "Person",
             "name": "Rakshit Sahu"
           }
       }
   `
   };
 }
  return (
    <>
    {console.log(gcamJson)}
    <Head>
    <title>{title}</title>
    <meta
      name="description"
      content= {description}
      key="desc"
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={addPageInfo()}
      key="product-jsonld"
    />
  </Head>
    <Navbar brands={brands} developers={developers}/>
    <article className='grid justify-items-center m-3'>
    <h1 className='text-3xl font-thin mt-3'> Download Google Camera Ports For {phoneBrand} {phoneModel} </h1>
    <p className=' prose prose-xl font-thin text-xl flex flex-wrap m-3 bg-white shadow-inner shadow-2xl contrast-100 brightness-90 p-3 rounded-3xl'> 
    {GcamDescription}
    </p>
    <GcamColorfulPoster gcams = {gcamJson} heading = {'name'} download={true}/>
    <div className='mt-3'>
    <center>
    <h2 className = 'text-3xl font-thin' >Generic Google Camera Ports Might Be Compatible For {phoneModel}</h2>
    </center>
    <p className=' font-thin text-xl flex flex-wrap m-3 bg-white shadow-inner shadow-2xl contrast-100 brightness-90 p-3 rounded-3xl'> 
    {GenericGcamDescription}
    </p>
    <div>
    <GcamColorfulPoster gcams = {genericGcams} heading={'name'}/>
    </div>

    <GcamColorfulPoster gcams = {gcamJson} heading = {'name'}/>
    </div>
    <div className='m-3 w-full'>
    <center><h3 className='text-2xl font-thin  m-3'> Download Google Camera Ports By Popular Developers</h3></center>
    {`We have wide variety of Google Camera ports. You can check them out at`} 
    <DisplayDevelopers developers={developers}/>
    </div>
    <div className='m-3 w-full'>
    <center><h3 className='text-2xl font-thin'> Download Google Camera Ports By Versions</h3></center>
    <DisplayGcamVersions gcamVersions = {gcamVersions} heading={'name'}/>
    
    </div>
    </article>
    </>
  )
}
