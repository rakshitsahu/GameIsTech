import React from 'react'
import axios from 'axios'
import Navbar from '@/Components/gcam/Navbar'
import PhoneBrandsGcam from '@/Components/gcam/phoneBrandsGcam'
import GcamColorfulPoster from '@/Components/gcam/gcamColorfulPoster'
import { GCAM_GET_REQUEST } from '@/Components/API/GET_API_Manager'
import GCAM_API_STATE from '@/Components/API/API_States'
import GCAM_DB_COLLECTION from '@/Components/gcam/mongodb/DB_Name_State'
import { FindAllOperation } from '@/Components/API/POST_API_Manager'
import Head from 'next/head'
export async function getStaticPaths(){
    const res  = await GCAM_GET_REQUEST(GCAM_API_STATE.PhoneBrands)
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
        paths : paths ,
        fallback: "blocking"
      }
}

export async function getStaticProps(context){
    // const data = {
    //     name : 'hello'
    // }
    // console.log('working till heere')
    const phone = context.params.phone
    console.log(' data of static props is', phone)
    const data = await FindAllOperation (GCAM_DB_COLLECTION.Gcam_Post , { brand : phone }).catch( err => {return {}} )
    console.log('the data is of this page', data)
    if(data.length == 0)
    {
      return {
        notFound: true,
      }
    }
    console.log('the new data is', data) 
    // const data  = await axios.post(`http://localhost:3000/api/gcam/filtergcampost`,{
    //   brand : phone
    // }).then(
    //     (result)=>{
    //       return result.data
    //     }
    //   )
    //   console.log('the data is ',data)
      const developers = await GCAM_GET_REQUEST(GCAM_API_STATE.DeveloperNames)
      const brands = await GCAM_GET_REQUEST(GCAM_API_STATE.PhoneBrands)
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
    const description = `Download Gcam for ${phone} Devices. We have so many Google Camera ports for almost every ${phone} Device`
    const title = `Gcam for ${phone} Devices | Google Camera Ports`
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
    <Navbar brands={brands} developers = {developers}/>
    <center><h1 className='text-3xl font-thin'> Download Google Camera Ports for {phone} Devices</h1></center>
    {console.log(GcamJson)}
    {phone}
    <PhoneBrandsGcam gcams = {GcamJson} heading = {phone}/>
    </>
  )
}
