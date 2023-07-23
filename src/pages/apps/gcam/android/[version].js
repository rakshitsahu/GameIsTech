import React from 'react'
import axios from 'axios'
import Navbar from '@/Components/gcam/Navbar'
import GCAM_API_STATE from '@/Components/API/API_States'
import { GCAM_GET_REQUEST } from '@/Components/API/GET_API_Manager'
import GCAM_DB_COLLECTION from '@/Components/gcam/mongodb/DB_Name_State'
import { FindAllOperation } from '@/Components/API/POST_API_Manager'
import GcamColorfulPoster from '@/Components/gcam/gcamColorfulPoster'
import Head from 'next/head'
export async function getStaticPaths(){
  console.log('building this page')
    const res  = await GCAM_GET_REQUEST(GCAM_API_STATE.Androidversions)
    //   console.log( 'gcam versions are', res)
      const paths = res.map( (element)=>{
        return {
            params:{
            version : element.name,
        },
    }
      })
      console.log('the paths are', paths)
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
    const version = context.params.version
    console.log(' data of static props is', version)
    console.log('type of versionb is ', typeof version)
    const data = await FindAllOperation (GCAM_DB_COLLECTION.Gcam , {requiredAndroid : parseFloat(version) }).catch( err => {return {}} )
    console.log('the new data is', data)
    if(data.length == 0)
    {
      return {
        notFound: true,
      }
    }
      const developers = await GCAM_GET_REQUEST(GCAM_API_STATE.DeveloperNames)
      const brands = await GCAM_GET_REQUEST(GCAM_API_STATE.PhoneBrands)

      return {
        props :{
            data ,
            brands,
            developers,
            version
        },
        revalidate: 10,
      }
}
export default function Version({data , brands, developers , version}) {
  const GcamJson = data;
  const description = ` Download All the Google Camera ports for Android version ${version} .
  Gcam apk for Android ${version} download.
  `
  const title =`Download Gcam Ports For Android ${version} | Google Camera Ports`
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
    <title> ${title} </title>
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
    <GcamColorfulPoster gcams = {GcamJson} heading = {'requiredAndroid'} prefix = 'Android Version '/>
    </>
  )
}
