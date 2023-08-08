import React from 'react'
import axios from 'axios'
import Navbar from '@/Components/gcam/Navbar'
import { GCAM_GET_REQUEST } from '@/Components/API/GET_API_Manager'
import GCAM_API_STATE from '@/Components/API/API_States'
import Head from 'next/head'
import GcamColorfulPoster from '@/Components/gcam/gcamColorfulPoster'
import GCAM_DB_COLLECTION from '@/Components/gcam/mongodb/DB_Name_State'
import { FindAllOperation } from '@/Components/API/POST_API_Manager'
export async function getStaticPaths(){
  console.log('getStaticPaths started')
    const res  = await GCAM_GET_REQUEST(GCAM_API_STATE.GcamVersions)
      console.log( 'gcam versions are', res)
      const paths = res.map( (element)=>{
        return {
            params:{
            version : element.name,
        },
    }
      })
      console.log( 'paths are' , paths )
      return {
        paths : [],
        fallback: "blocking"
      }
}

export async function getStaticProps(context){
    // const data = {
    //     name : 'hello'
    // }
    console.log('working till heere')
    const version = context.params.version
    console.log(' data of static props is', version)
    const data = await FindAllOperation (GCAM_DB_COLLECTION.Gcam , { version: version }).catch( err => {return {}} )
    if(data.length == 0)
    {
      return {
        notFound: true,
      }
    }
    console.log('the new data is', data) 
    // const data  = await axios.post(`http://localhost:3000/api/gcam/filtergcam`,{
    //     version: 13
    // }).then(
    //     (result)=>{
    //       return result.data
    //     }
    //   )
      const developers = await GCAM_GET_REQUEST(GCAM_API_STATE.DeveloperNames)
      const brands = await GCAM_GET_REQUEST(GCAM_API_STATE.PhoneBrands)

      return {
        props :{
            data ,
            brands,
            developers,
            version
        }
      }
}
export default function Version({data , brands, developers, version}) {
  const GcamJson = data;
  const description = `Download Gcam ${version} APKs by various developer. Google Camera ${version} APK Download`
  const title = `Gcam ${version} APKs Download | Google Camera ${version} APK`
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
    {console.log(GcamJson)}
    <GcamColorfulPoster gcams = {GcamJson} heading = {'name'}/>
    </>
  )
}
