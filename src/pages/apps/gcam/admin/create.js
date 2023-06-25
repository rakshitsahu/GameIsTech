import React from 'react'
import { useState , useEffect } from 'react'
import { Button } from 'react-bootstrap'
import AdminNavbar from '@/Components/gcam/adminNavbar'
import { version } from 'mongoose'
import axios from 'axios'

function CreatePost() {
  const [deviceName , setDeviceName] = useState('')
  const [gcamName , setGcamName] = useState('')
  const [gcamDownloadLink , setGcamDownloadLink] = useState('')
  const [gcamVersion , setGcamVersion] = useState('')
  const [gcamDescription , setGcamDescription] = useState('')
  const [gcamDeveloperName , setGcamDeveloperName] = useState('')
  const [processorName , setProcessorName] =  useState('')
  const [deviceBrand , setDeviceBrand] = useState('')
  const [processsorsJson , setProcessorJson] = useState([])
  const [brandsjson , setBrandsJson] = useState([])
  const [developersJson , setDevelopersJson]= useState([])
  const [androidVersionsJson , setAndroidVersionsJson]= useState([])
  async function getData(){
    await axios.get('http://localhost:3000/api/gcam/androidversion').then(
      (res)=> setAndroidVersionsJson(res.data)
    ).catch((err)=> {})

    await axios.get('http://localhost:3000/api/gcam/developernames').then(
      (res) => setDevelopersJson(res.data)
    ).catch((err)=>{})

    await axios.get('http://localhost:3000/api/gcam/phonebrands').then(
      (res)=> setBrandsJson(res.data)
    ).catch((err)=>{})

    await axios.get('http://localhost:3000/api/gcam/processorbrands').then(
      (res)=> setProcessorJson(res.data)
    ).catch((err)=>{})


  }

  useEffect( () => {
    getData()
  }, []);

  function onDeviceNameChange(e){
    setDeviceName(e.target.value)
  }

  async function onPostClick(){
    
    const Post = {
      name : deviceName,
      processor : processorName,
      brand : gcamDeveloperName,
      downloadLink : gcamDownloadLink
    }
    const gcamData = {
      developerName : gcamDeveloperName,
      name :gcamName,
      version : parseInt(gcamVersion),
      downloadLink : gcamDownloadLink,
      description : document.getElementById('gcam').value
    }
    const PostData = {
      post : Post,
      gcam : gcamData
    }
    console.log(PostData)

    await axios.post('http://localhost:3000/api/gcam/gcampost',PostData).then(
      (result)=>{
        console.log('result is ' , result);
        return result
      }
    ).catch()
  }

  async function onAddGcamClick(){

    const gcamData = {
      developerName : gcamDeveloperName,
      name :gcamName,
      version : parseInt(gcamVersion),
      downloadLink : gcamDownloadLink,
      description : document.getElementById('gcam').value
    }
    // console.log(gcamData)
    // const stringJson = JSON.stringify(gcamData)
    // const config = {
    //   headers :  {
    //     data : stringJson
    //   }
    // }
    const res  = await axios.post('http://localhost:3000/api/gcam/gcamcheck', gcamData).then(
      (result)=>{
        // console.log('result is ' , result);
        return result
      }
    )
    return res;

  }


  return (
    <>
    <AdminNavbar/>
    <div className='flex'></div>
    <div className='place-content-center grid gap-6 drop-shadow-2xl m-2 '>
    <font className='place-self-center'>
    <h1 className='text-6xl font-thin'>Create Google Camera Post</h1>
    </font>

    <font className='place-self-center'>
    <h1 className='text-4xl font-thin mt-8'>Device Details</h1>
    </font>
    <div className='DEVICE_NAME grid grid-cols-2'>
    <font className='self-center text-2xl'>Device Name :</font>
    <div id = 'test'>  <input type='text' value={deviceName} className='w-72 h-12 rounded-lg text-lg text-black' onChange={onDeviceNameChange}/>
 
    </div>
    </div>


    <div className='grid grid-cols-2'>
    <font className = 'self-center text-2xl'>Brand : </font> 

    <select name="cars" defaultValue='makeChoice' value={deviceBrand} onChange={(e) => setDeviceBrand(e.target.value) } className='m-2 bg-blue-600 p-4 rounded-xl' id="cars">
    {Object.keys(brandsjson).map(  (index) => {
      //console.log ( 'the brand is ', brandsjson.index)
        return (
          <option key={index} value={brandsjson[index].name}>{brandsjson[index].name}</option>

        );
      })}

  </select>
    </div>
    <div>  
  
  <div className='grid grid-cols-2'>    

       </div>
      </div>
         <div className='grid grid-cols-2'>  
         <font className='self-center text-2xl'>Processor :</font> 
  <select name="cars" defaultValue='makeChoice' value={processorName} onChange={(e) => setProcessorName(e.target.value) } className='m-2 bg-blue-600 p-4 rounded-xl' id="cars">
  {Object.keys(processsorsJson).map(  (index) => {
      //console.log ( 'the brand is ', processsorsJson.index)
        return (
          <option key={index} value={processsorsJson[index].name}>{processsorsJson[index].name}</option>

        );
      })}
</select>

     </div>
     <font className='place-self-center text-3xl font-thin mt-3  '>Google Camera Details</font>
    <div id = 'test' className='grid grid-cols-2'>
    <font className='self-center text-2xl'>Developer Name : </font>
    <select name="cars" defaultValue='makeChoice' value={processorName} onChange={(e)=> setGcamDeveloperName(e.target.value)} className='m-2 bg-blue-600 p-4 rounded-xl' id="cars">
  {Object.keys(developersJson).map(  (index) => {
      //console.log ( 'the brand is ', developersJson.index)
        return (
          <option key={index} value={developersJson[index].name}>{developersJson[index].name}</option>

        );
      })
    }
</select>
    
     </div>

     
    <div id = 'test' className='grid grid-cols-2'>
    <font className='self-center text-2xl'>Gcam Name : </font>
    <input type='text' onChange={(e)=> setGcamName(e.target.value)} className='w-72 h-12 rounded-lg text-lg text-black'/>
     </div>

     
    <div id = 'test' className='grid grid-cols-2'>
    <font className='self-center text-2xl'>Gcam Version : </font>
    <input type='text' onChange={(e)=>setGcamVersion(e.target.value)} className='w-72 h-12 rounded-lg text-lg text-black'/>
     </div>

     <div id = 'test' className='grid grid-cols-2'>
     <font className='self-center text-2xl'>Gcam Download Link : </font>
     <input type='text' onChange={(e)=>setGcamDownloadLink(e.target.value)} className='w-72 h-12 rounded-lg text-lg text-black'/>
      </div>

    <div className='grid grid-cols-2'>
    <font className='self-center text-2xl'> Description :</font> 
    <textarea className='rounded-lg' id="gcam" name="gcam" rows="4" cols="50">
    At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.
     </textarea>
    </div>
    <div className='flex justify-center'>
    <button onClick={ () => onPostClick() } className='bg-indigo-500 px-4 py-2 rounded-2xl'> 
    Post
    </button>
    <button onClick={ () => onAddGcamClick() } className='bg-indigo-500 mx-2 px-4 py-2 rounded-2xl'> 
    Add Gcam
    </button>
    </div>
    </div>
    </>
  )
}

export default CreatePost