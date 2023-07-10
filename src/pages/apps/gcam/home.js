import React from 'react'
import Navbar from '@/Components/gcam/Navbar'
import Link from 'next/link'
import axios from 'axios'
import DeviceBrands from '@/Components/gcam/deviceBrands'
import DisplayDevelopers from '@/Components/gcam/displayDevelopers'
import DisplayProcessorBrands from '@/Components/gcam/displayProcessorBrands'
import DisplayAndroidVersions from '@/Components/gcam/displayAndroidVersions'
import DisplayGcamVersions from '@/Components/gcam/displayGcamVersions'
import DisplayGcamForDevices from '@/Components/gcam/displayGcamPost'
import Footer from '@/Components/gcam/footer'
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const brands = await axios.get('http://localhost:3000/api/gcam/phonebrands').then(response => {
    // console.log(response.data)
    return response.data
  })
 
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  const developers = await axios.get('http://localhost:3000/api/gcam/developernames').then(response => {
  // console.log(response.data)
  return response.data
})

const processorbrands = await axios.get('http://localhost:3000/api/gcam/processorbrands').then(response => {
// console.log( 'the processor json is ', response.data)
return response.data
})

const androidVersions = await axios.get('http://localhost:3000/api/gcam/androidversion').then(response => {
// console.log( 'the android version json is ', response.data)
return response.data
})

const gcamVersions = await axios.get('http://localhost:3000/api/gcam/gcamversion').then(response => {
// console.log( 'the gcam versions json is ', response.data)
return response.data
})

const gcamPosts = await axios.get('http://localhost:3000/api/gcam/getgcamposts').then(response => {
// console.log( 'the gcam Posts json is ', response.data)
return response.data
})

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
      postMap
    },
  }
}
export default function home({brands , developers,processorbrands , androidVersions , gcamVersions, phonebrands , postMap }) {
  return (
    <>
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