import React from 'react'
import Navbar from '@/Components/gcam/Navbar'
import DeviceBrands from '@/Components/gcam/deviceBrands'
import DisplayDevelopers from '@/Components/gcam/displayDevelopers'
import DisplayProcessorBrands from '@/Components/gcam/displayProcessorBrands'
import DisplayAndroidVersions from '@/Components/gcam/displayAndroidVersions'
import DisplayGcamVersions from '@/Components/gcam/displayGcamVersions'
import DisplayGcamForDevices from '@/Components/gcam/displayGcamPost'
import Footer from '@/Components/gcam/footer'
import { GCAM_GET_REQUEST } from '@/Components/API/GET_API_Manager'
import GCAM_API_STATE from '@/Components/API/API_States'
import Head from 'next/head'
import GcamColorfulPoster from '@/Components/gcam/gcamColorfulPoster'
export async function  getServerSideProps(context) {
  const { req, query, res, asPath, pathname } = context;
  const hostname = req.headers.host
  console.log('the hostname is',req.headers.host)
  // console.log( 'the hostname env is', hostname)
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const test = await GCAM_GET_REQUEST(GCAM_API_STATE.Test)
  const brands = await GCAM_GET_REQUEST(GCAM_API_STATE.PhoneBrands)
 
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  
  const developers = await GCAM_GET_REQUEST(GCAM_API_STATE.DeveloperNames)

const processorbrands = await GCAM_GET_REQUEST(GCAM_API_STATE.ProcessorBrands)

const androidVersions = await GCAM_GET_REQUEST(GCAM_API_STATE.Androidversions)

const gcamVersions = await GCAM_GET_REQUEST(GCAM_API_STATE.GcamVersions)

const gcamPosts = await GCAM_GET_REQUEST(GCAM_API_STATE.GcamPost)

const genericGcams = await GCAM_GET_REQUEST(GCAM_API_STATE.Generic)
console.log('generic gcams are', genericGcams)

  const postMap = {}
  gcamPosts.forEach( (post)=>{
    console.log(  post)
    if( !postMap[post.brand] )
    postMap[post.brand] = [post]
    else
    postMap[post.brand].push(post)
  })
console.log('the map is ' , postMap)
  return {
    props: {
      brands,
      developers,
      processorbrands,
      androidVersions,
      gcamVersions,
      postMap,
      genericGcams
    },
  }
}
export default function home({brands , genericGcams, developers,processorbrands , androidVersions , gcamVersions, phonebrands , postMap }) {
  const description = ` We are the best place to download Gcam APKS. 
  We have clean and best UI with powerful fiters which helps you to find Google Camera Port 
  in no time
  `
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
    <title>An App For Gcam APKs | Google Camera Ports</title>
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
      <article className='grid'>
      <center className='mt-7'>
      <font className='font-thin text-3xl hover:underline transition delay-500 decoration-blue-600 underline-offset-4'> Phone brands that supports Google Camera Port </font>
      </center>
    <div className='m-3'><DeviceBrands brands={brands}/></div>
    
    <center className='mt-7'>
    <font className='font-thin text-3xl hover:underline transition delay-500 decoration-blue-600 underline-offset-4'> Popular Google Camera Port Developers </font>
    </center>

    <div className='m-3'>
    <DisplayGcamVersions gcamVersions={developers} heading = {'name'} />
    
    </div>

    <div className='m-3'>
    <center className='mt-7'>
    <font className='font-thin text-3xl hover:underline transition delay-500 decoration-blue-600 underline-offset-4'> Generic Google Camera APKs </font>
    </center>

    <div class=" m-3">
    <GcamColorfulPoster gcams={genericGcams} heading = {'name'}/>
   </div>
    </div>

    <center className='mt-7'>
    <font className='font-thin text-3xl hover:underline transition delay-500 decoration-blue-600 underline-offset-4'> Download Google Camera Port by Versions </font>
    </center>

    <div class=" m-3">
    <DisplayGcamVersions gcamVersions={gcamVersions} heading = {'name'}/>
   </div>

   {
    Object.keys(postMap).map(  (index) => {
      //console.log ( 'the brand is ', brands.index)
        return (

          <div key={index} value={postMap[index].name}  className=' bg-white rounded-3xl p-4'>
          <h2 className='text-3xl font-thin'><center>Download google camera for {index} devices</center></h2>
          <DisplayGcamForDevices gcamPosts={postMap[index]} / >
          </div>
         

        );
      })
   }
   
    <center className='mt-7'>
    <font className='font-thin text-3xl hover:underline transition delay-500 decoration-blue-600 underline-offset-4'> Find the compatible Google Camera Port for your device </font>
    </center>
    
    <div className='m-3'><DisplayProcessorBrands processors = {processorbrands}/></div>
    <div className='m-3'><DisplayAndroidVersions androidVersions = {androidVersions}/></div>
    <Footer/>
    </article>
    
    
    </>
    
  )
}