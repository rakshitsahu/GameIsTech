import React from 'react'
import axios from 'axios'
import Navbar from '@/Components/gcam/Navbar'
import Head from 'next/head'
import GcamColorfulPoster from '@/Components/gcam/gcamColorfulPoster'
import { GCAM_GET_REQUEST } from '@/Components/API/GET_API_Manager'
import GCAM_API_STATE from '@/Components/API/API_States'
import GCAM_DB_COLLECTION from '@/Components/gcam/mongodb/DB_Name_State'
import { FindAllOperation } from '@/Components/API/POST_API_Manager'
export async function getStaticPaths(){
    const res  = await GCAM_GET_REQUEST(GCAM_API_STATE.DeveloperNames)
    //   console.log( 'gcam versions are', res)
      const paths = res.map( (element)=>{
        return {
            params:{
            developer : element.name,
        },
    }
      })
      console.log( 'paths are' , paths )
      return {
        paths : paths,
        fallback: "blocking"
      }
}

export async function getStaticProps(context){
    // const data = {
    //     name : 'hello'
    // }
    // console.log('working till heere')
    const developer = context.params.developer
    console.log(' data of static props is', developer)
    const data = await FindAllOperation (GCAM_DB_COLLECTION.Gcam , {developerName: developer }).catch( err => {return {}} )
    console.log('the new data is', data)
    if(data.length == 0)
    {
      return {
        notFound: true,
      }
    }
    // const data  = await axios.post(`http://localhost:3000/api/gcam/filtergcam`,{
    //     developerName: 'BSG'
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
            developer
        }
      }
}
export default function Developer({data , brands, developers,developer}) {
  if(!data)
  data = []
  const GcamJson = data;
  const description = `Download all Gcam ports made by ${developer}. We have ${GcamJson.length} Google Camera Ports that are
  made by ${developer}.`
  const title = `Google Camera Ports Developed by ${developer} | Gcam APKs`
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
    <GcamColorfulPoster gcams = {GcamJson} heading = {'developerName'}/>
    </>
  )
}
