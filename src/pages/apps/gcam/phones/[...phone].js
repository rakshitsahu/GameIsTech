import React from 'react'
import axios from 'axios'
import Navbar from '@/Components/gcam/Navbar'
import {BsReddit , BsTelegram , BsCamera2} from 'react-icons/bs'
import { SiXdadevelopers } from "react-icons/si"
import DisplayDevelopers from '@/Components/gcam/displayDevelopers'
import DisplayGcamVersions from '@/Components/gcam/displayGcamVersions'
import { GCAM_GET_REQUEST } from '@/Components/API/GET_API_Manager'
import GCAM_API_STATE from '@/Components/API/API_States'
import GCAM_DB_COLLECTION from '@/Components/gcam/mongodb/DB_Name_State'
import { FindAllOperation } from '@/Components/API/POST_API_Manager'
import DisplayGenericGcams from '@/Components/gcam/displayGenericGcams'
import Head from 'next/head'
import Link from 'next/link'
export async function getStaticPaths(){
  const phoneData = await GCAM_GET_REQUEST(GCAM_API_STATE.PhoneData)
  // console.log(phoneData)
  const paths = []
   phoneData.map((phoneData) =>{
    console.log(phoneData)
    phoneData.data.map(
      (phone) =>{
        // console.log(phone)
        const phoneName = phone.phoneName.replaceAll(" ", "-")
        const phoneBrand = phoneData.phoneBrand.replaceAll(" ", "-")
        console.log(phoneName)
        console.log(phoneBrand)
        paths.push({
          params: {
            phone : [phoneBrand, phoneName],
          },
        })
       
      }
    )
  })

  console.log('the paths are ' , paths)
    return {
        paths : paths,
        fallback: true
    }
}

export async function getStaticProps(context){
  // console.log('working here')
  const phone = context.params.phone
  console.log( 'the phone is' ,context)
  // console.log('working here',phone[0], phone[1])
  const phoneBrand = phone[0].replaceAll("-", " ");
  const phoneName = phone[1].replaceAll("-", " ");

  // if(data.length == 0)
  // {
  //   return {
  //     notFound: true,
  //   }
  // }


    const developersData = await GCAM_GET_REQUEST(GCAM_API_STATE.Developers)
    const phoneData = await GCAM_GET_REQUEST(GCAM_API_STATE.PhoneData)
    const genericGcams = await GCAM_GET_REQUEST(GCAM_API_STATE.Generic)
    const gcamVersions = await GCAM_GET_REQUEST(GCAM_API_STATE.GcamVersions)
    const developers = developersData.map(({ developerName }) => ({ name : developerName }))
    const brands = phoneData.map(({ phoneBrand }) => ({ name : phoneBrand }))

    let phoneBrandData
    phoneData.forEach( phone => {
      if( phone.phoneBrand === phoneBrand )
      {
        phoneBrandData = phone.data;
      }
    });

    let currentPhoneData
    phoneBrandData.forEach( phone => {
      if( phone.phoneName === phoneName)
      {
        currentPhoneData = phone.source;
      }
    });
    console.log(currentPhoneData)


    return {
      props :{
          phoneBrand,
          phoneName,
          developers,
          brands,
          genericGcams,
          gcamVersions,
          currentPhoneData
      },
      // revalidate: 20,
    }
}
export default function GcamDownloadForPhone({phoneBrand, phoneName , developers , brands , genericGcams, gcamVersions , currentPhoneData}) {
  // console.log('gcam json is', data)
  const GcamDescription = `If you are looking for working Gcam for ${phoneName}. 
   You are at the best place. we have variety of Google Camera Ports.
   With excellent filters which will help you to find out the most compatible Google Camera for ${phoneName}
   in no time.`
   const GenericGcamDescription = `Generic Gcams are compatible with most of the devices.
    Make sure you checkout Gcam ports in ${phoneName}. 
   Before downloading, verify the compatibility from the Google Camera description with ${phoneName} features.`
   const description = `Download Gcam for ${phoneName}. We also have generic Google Camera ports which could work in ${phoneName}.`
   const title = `Gcam for ${phoneName} | Google Camera Ports`
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
      name={title}
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
    <h1 className='text-3xl font-thin mt-3'> Download Google Camera Ports For {phoneBrand} {phoneName} </h1>
    <p className=' prose prose-xl font-thin text-xl flex flex-wrap m-3 bg-white shadow-inner shadow-2xl contrast-100 brightness-90 p-3 rounded-3xl'> 
    {GcamDescription}
    </p>
    <div className='mt-3'>
    {
      Object.keys(currentPhoneData).map((source)=>{
        console.log(source)
        {
         return Object.keys(currentPhoneData[source]).map(
            (index)=>{
              console.log(index)
              const anchorText = currentPhoneData[source][index].anchorText
              const downloadLink = currentPhoneData[source][index].downloadLink
              console.log(anchorText)
              console.log(downloadLink)
              return (
                <div key = {source} className='m-1 p-3 underline decoration-red-400 underline-offset-2 p-3 rounded-full'>
                { source === 'reddit' &&  <a href={downloadLink}><div className='flex items-center bg-blue-400 p-3 rounded-full'><BsReddit className='text-orange-400' /><button >{anchorText}</button> </div> </a>  }
                { source === 'telegram' &&  <a href={downloadLink}><div className='flex items-center bg-emerald-400 p-3 rounded-full'><BsTelegram className='text-sky-400' /> <button >{anchorText}</button></div></a> }
                { source === 'xda' && <a href={downloadLink}><div className='flex items-center bg-purple-400 p-3 rounded-full'><SiXdadevelopers className='text-red-400' /> <button >{anchorText}</button></div></a> }
                { source === 'official' && <a href={downloadLink}><div className='flex items-center bg-rose-400 p-3 rounded-full'><BsCamera2 className='text-emerald-400' /> <button >{anchorText}</button></div></a> }
                </div>
              );
            }
          )
        }


      }
      )
    }
    </div>
    <div className='mt-3'>
    <center>
    <h2 className = 'text-3xl font-thin' >Generic Google Camera Ports Might Be Compatible For {phoneName}</h2>
    </center>
    <p className=' font-thin text-xl flex flex-wrap m-3 bg-white shadow-inner shadow-2xl contrast-100 brightness-90 p-3 rounded-3xl'> 
    {GenericGcamDescription}
    </p>
    
    


    
    <div className=''>
    <center className='mt-7'>
    <font className='font-thin text-4xl hover:underline transition delay-500 decoration-blue-600 underline-offset-4'> Generic Google Camera APKs </font>
    </center>
    <div>
    <DisplayGenericGcams genericGcams = {genericGcams}/>
    </div>
    </div>

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
