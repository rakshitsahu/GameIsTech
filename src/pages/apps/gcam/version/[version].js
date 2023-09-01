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
  // console.log('getStaticPaths started')
    const res  = await GCAM_GET_REQUEST(GCAM_API_STATE.GcamVersions)
      // console.log( 'gcam versions are', res)
      const paths = res.map( (element)=>{
        return {
            params:{
            version : element.version,
        },
    }
      })
      // console.log( 'paths are' , paths )
      return {
        paths : [],
        fallback: true
      }
}

export async function getStaticProps(context){
    // const data = {
    //     name : 'hello'
    // }
    // console.log('working till heere')
    const version = context.params.version
    // console.log(' data of static props is', version)
    const phoneData = await GCAM_GET_REQUEST(GCAM_API_STATE.PhoneData)
    const developersData = await GCAM_GET_REQUEST(GCAM_API_STATE.Developers)
    const gcamVersions = await GCAM_GET_REQUEST(GCAM_API_STATE.GcamVersions)
    const gcamVersionsMap = await GCAM_GET_REQUEST(GCAM_API_STATE.GcamVersionData)
    // console.log(gcamVersionsMap)
    const gcamVersionData = gcamVersionsMap.get(version)
    // console.log(gcamVersionData)
    const developers = developersData.map(({ developerName }) => ({ name : developerName }))
    const brands = phoneData.map(({ phoneBrand }) => ({ name : phoneBrand }))
    
      return {
        props :{
          gcamVersionData,
          gcamVersions,
            brands,
            developers,
            version
        }
      }
}
export default function Version({gcamVersionData ,gcamVersions , brands, developers, version}) {
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
const H1 = 'font-semibold text-5xl'
const content = 'font-thin text-xl'
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
    <article>
    <center>
    <h1 className={`${H1} m-8`}>{title}</h1>
    </center>
    <p className={`${content}`}>
    This page Contains all the Gcam {version} apk's till date. I have listed all the Google Cameras sorted by date.
    If you are having compatibility issues with any of gcam ports, you can checkout the Generic / Stable Gcam APK's.

    </p>
    <GcamColorfulPoster gcams = {gcamVersionData} className= 'h-screen w-screen' heading = {'name'}/>
    </article>
    </>
  )
}
