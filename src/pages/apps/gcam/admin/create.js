import React from 'react'
import { useState , useEffect } from 'react'
import { Button } from 'react-bootstrap'
import AdminNavbar from '@/Components/gcam/adminNavbar'
import { version } from 'mongoose'
import axios from 'axios'
import GCAM_API_STATE from '@/Components/API/API_States'
import { GCAM_GET_REQUEST } from '@/Components/API/GET_API_Manager'
import GCAM_DB_COLLECTION from '@/Components/gcam/mongodb/DB_Name_State'
import { setCookie , getCookie , hasCookie } from "cookies-next";
import { UpdateOne , FindAllOperation , InsertOperation } from '@/Components/API/POST_API_Manager'
import { Authorization } from '@/Components/API/POST_API_Manager'
export const getServerSideProps = async ({ req , res }) =>{
  // Fetch data from external API

    const authentication = await Authorization(req , res)

//   const authentication = await axios.post('http://localhost:3000/api/gcam/mongo/authorization',{
//     token : getCookie('Token',{ req, res})
// }).then( (response) => {return response.data} )
   
  return { props: { authentication } }
}

function CreatePost({authentication}) {

  
  const [deviceName , setDeviceName] = useState('')
  const [gcamName , setGcamName] = useState('')
  const [gcamDownloadLink , setGcamDownloadLink] = useState('')
  const [gcamVersion , setGcamVersion] = useState('')
  const [gcamRequiredAndroid , setgcamRequiredAndroid] = useState('')
  const [gcamDeveloperName , setGcamDeveloperName] = useState('')
  const [processorName , setProcessorName] =  useState('')
  const [deviceBrand , setDeviceBrand] = useState('')
  const [gcamDate , setGcamDate] = useState('')
  const [processsorsJson , setProcessorJson] = useState([])
  const [brandsjson , setBrandsJson] = useState([])
  const [developersJson , setDevelopersJson]= useState([])
  const [androidVersionsJson , setAndroidVersionsJson]= useState([])
  const [gcamVersions , setGcamVersionsJson]= useState([])
  const [gcamProcessorsList , setGcamProcessorsList] = useState([])
  const [gcamBrandsList , setGcamBrandsList] = useState([])
  const [xdaThread , setXdaThread] = useState('')
  const [isGeneric, setIsGeneric] = useState(false)
  useEffect( () => {
    getData()
  }, []);
  if(authentication.status != 200)
  return <div> user is not authorized </div>
  async function getData(){
    var response
    response = await GCAM_GET_REQUEST(GCAM_API_STATE.Androidversions)
    setAndroidVersionsJson(response)
    
    response = await GCAM_GET_REQUEST(GCAM_API_STATE.DeveloperNames)
    setDevelopersJson(response)

    response = await GCAM_GET_REQUEST(GCAM_API_STATE.PhoneBrands)
    setBrandsJson(response)

    response = await GCAM_GET_REQUEST(GCAM_API_STATE.ProcessorBrands)
    setProcessorJson(response)

    response = await GCAM_GET_REQUEST(GCAM_API_STATE.GcamVersions)
    setGcamVersionsJson(response)


  }

  function handleCurrentOption(newOption){
      document.getElementById(newOption).classList.remove('bg-teal-500')
      document.getElementById(newOption).classList.add('bg-red-500')
  }



  function onDeviceNameChange(e){
    setDeviceName(e.target.value)
  }
  async function InsertGcam(gcamData , callback = null){
    const resultJson = await FindAllOperation(GCAM_DB_COLLECTION.Gcam , {downloadLink : gcamData.downloadLink}).catch( err => {return {}} )
    if( resultJson.length == 0 )
    {
      await InsertOperation(GCAM_DB_COLLECTION.Gcam , gcamData).then( (value) =>{
        if(callback)
        callback()
        return gcamData.downloadLink
      } ) .catch( err => { return null })
    }
    else
    {
      if(callback)
      callback()
      return gcamData.downloadLink
    }
    
  }

async function CreatePost(Post , gcamData){

const downloadLink = await InsertGcam(gcamData)
if(downloadLink){
  const response = await UpdateOne(GCAM_DB_COLLECTION.Phone_Brands , {name : Post.brand} , {
    $addToSet : { phones : Post.name }
} )

}
const resultJson = await FindAllOperation(GCAM_DB_COLLECTION.Gcam_Post , {downloadLink : gcamData.downloadLink}).catch( err => {return {}} )
console.log( 'the result json is', resultJson)
if( resultJson.length != 0 ){
  await UpdateOne(GCAM_DB_COLLECTION.Gcam_Post , {gcams : gcamData.downloadLink} , {
    $addToSet : {gcams : gcamData.downloadLink}
  } )
}
else
{
  console.log('insertion function called')
  await InsertOperation(GCAM_DB_COLLECTION.Gcam_Post , Post).catch( err => { 
    console.log('error occured while creating the post')
   })
}

}
  async function onPostClick(){
    if( !deviceName || !processorName || !deviceBrand || !gcamDownloadLink )
    return {message :"fields can not be empty"}
    const gcamData = {
      developerName : gcamDeveloperName,
      name :gcamName,
      version : gcamVersion,
      downloadLink : gcamDownloadLink,
      description : document.getElementById('gcam').value,
      releaseDate : gcamDate,
      deviceBrands : gcamBrandsList,
      processors :gcamProcessorsList,
      requiredAndroid: parseFloat(gcamRequiredAndroid),
      xdaThread : xdaThread,
      isGeneric : isGeneric
    }
    const Post = {
      name : deviceName,
      processor : processorName,
      brand : deviceBrand,
      downloadLink : gcamDownloadLink,
      gcams : [gcamData.downloadLink]
    }
    const PostData = {
      post : Post,
      gcam : gcamData
    }
    console.log(PostData)
    await CreatePost(Post , gcamData)
    // await axios.post('http://localhost:3000/api/gcam/gcampost',PostData).then(
    //   (result)=>{
    //     console.log('result is ' , result);
    //     return result
    //   }
    // ).catch()
  }

  async function onAddGcamClick(){

    const gcamData = {
      developerName : gcamDeveloperName,
      name :gcamName,
      version : gcamVersion,
      downloadLink : gcamDownloadLink,
      description : document.getElementById('gcam').value,
      releaseDate : gcamDate,
      deviceBrands : gcamBrandsList,
      processors :gcamProcessorsList,
      requiredAndroid: parseFloat(gcamRequiredAndroid),
      xdaThread : xdaThread,
      isGeneric : isGeneric
    }
    if( !gcamDeveloperName ||  !gcamName || !gcamDownloadLink
       || !gcamVersion || !gcamBrandsList.length || !gcamProcessorsList.length || !gcamRequiredAndroid )
       {
        return {message : 'field can not be empty'}
       }
    console.log(gcamData)
    await InsertGcam(gcamData , async () =>{
      await UpdateOne(GCAM_DB_COLLECTION.Developer_Names , {name : gcamData.developerName} , {
        $addToSet : { gcams : gcamData.downloadLink }
      } )
      await UpdateOne(GCAM_DB_COLLECTION.Gcam_Version , {name : gcamData.version} , {
        $addToSet : { gcams : gcamData.downloadLink }
      } )
    } )


    // console.log( 'the gcam data is', gcamData)
    // // const stringJson = JSON.stringify(gcamData)
    // // const config = {
    // //   headers :  {
    // //     data : stringJson
    // //   }
    // // }
    // const res  = await axios.post('http://localhost:3000/api/gcam/gcamcheck', gcamData).then(
    //   (result)=>{
    //     // console.log('result is ' , result);
    //     return result
    //   }
    // )
    // return res;

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
    <option value=''></option>
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
  <option value=''></option>
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
    <select name="cars" defaultValue='makeChoice' value={gcamDeveloperName} onChange={(e)=> setGcamDeveloperName(e.target.value)} className='m-2 bg-blue-600 p-4 rounded-xl' id="cars">
    <option value=''></option>
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
     <font className='self-center text-2xl'>Is Generic : </font>
     <input onClick={(e)=>{setIsGeneric(!isGeneric)}} type="checkbox" id="generic" name="generic" value="No"/>
      </div>
     
    <div id = 'test' className='grid grid-cols-2'>
    <font className='self-center text-2xl'>Gcam Version : </font>
    {console.log('gcam version' , gcamVersions)}
    <select name="cars" defaultValue='makeChoice' value={gcamVersion} onChange={(e) => {
      setGcamVersion(e.target.value)
      console.log('gcam version is changed')
    }  } className='m-2 bg-blue-600 p-4 rounded-xl' id="cars">
    <option value=''></option>
    {Object.keys(gcamVersions).map(  (index) => {
      //console.log ( 'the brand is ', gcamVersions.index)
        return (
          <option key={index} value={gcamVersions[index].name}>{gcamVersions[index].name}</option>

        );
      })}
  </select>
     </div>

     <div id = 'test' className='grid grid-cols-2'>
     <font className='self-center text-2xl'>Required Android : </font>
     <select name="cars" defaultValue='makeChoice' value={gcamRequiredAndroid} onChange={(e) => {setgcamRequiredAndroid(e.target.value)} } className='m-2 bg-blue-600 p-4 rounded-xl' id="cars">
     <option value=''></option>
     {Object.keys(androidVersionsJson).map(  (index) => {
       //console.log ( 'the brand is ', gcamVersions.index)
         return (
           <option key={index} value={androidVersionsJson[index].name}>{androidVersionsJson[index].name}</option>
 
         );
       })}
   </select>
      </div>

     <div id = 'test' className='grid grid-cols-2'>
     <font className='self-center text-2xl'>Gcam Download Link : </font>
     <input type='text' onChange={(e)=>setGcamDownloadLink(e.target.value)} className='w-72 h-12 rounded-lg text-lg text-black'/>
      </div>

      <div id = 'test' className='grid grid-cols-2'>
      <font className='self-center text-2xl'>Release Date : </font>
      <input type='text' onChange={(e)=>setGcamDate(e.target.value)} className='w-72 h-12 rounded-lg text-lg text-black'/>
       </div>

    <div className='grid grid-cols-2'>
    <font className='self-center text-2xl'> Description :</font> 
    <textarea className='rounded-lg' id="gcam" name="gcam" rows="4" cols="50">
    At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.
     </textarea>
    </div>

    <div className='grid grid-cols-2'>
    <font className='self-center text-2xl'>Compatible Processors</font> 
    <div className='flex flex-wrap gap-4'> 
    { Object.keys(processsorsJson).map(  (iterator) => {

      return <button key={iterator} id={processsorsJson[iterator].name} onClick={()=>{
        if(!gcamProcessorsList.includes(processsorsJson[iterator].name))
        setGcamProcessorsList( [...gcamProcessorsList ,processsorsJson[iterator].name])
        handleCurrentOption(processsorsJson[iterator].name)
      }} className="grid bg-teal-500 p-2 drop-shadow-2xl rounded-xl">
      <button className="justify-self-end"></button>
      <span className="justify-self-center">
      {processsorsJson[iterator].name}
      </span>
      
      </button>

  }) }
    </div>
    </div>

    <div className='grid grid-cols-2'>
    <font className='self-center text-2xl'>Compatible Brands</font> 
    <div className='flex flex-wrap gap-4'> 
    { Object.keys(brandsjson).map(  (iterator) => {

      return <button key={iterator} id={brandsjson[iterator].name} onClick={()=>{
        if(!gcamBrandsList.includes(brandsjson[iterator].name))
        setGcamBrandsList( [...gcamBrandsList ,brandsjson[iterator].name])
        handleCurrentOption(brandsjson[iterator].name)
      }} className="grid   bg-teal-500 p-2 drop-shadow-2xl rounded-xl">
      <button className="justify-self-end"></button>
      <span className="justify-self-center">{brandsjson[iterator].name}
      
      </span>
      
      </button>

  }) }
    </div>
    </div>

     
    <div id = 'test' className='grid grid-cols-2'>
    <font className='self-center text-2xl'>Xda Thread : </font>
    <input type='text' onChange={(e)=> setXdaThread(e.target.value)} className='w-72 h-12 rounded-lg text-lg text-black'/>
     </div>
    <div className='flex justify-center'>
    <button onClick={ () => onPostClick() } className='bg-indigo-500 active:bg-indigo-800 hover:ring-1 px-4 py-2 rounded-2xl'> 
    Post
    </button>
    <button onClick={ () => onAddGcamClick() } className='bg-indigo-500 active:bg-indigo-800 hover:ring-1 mx-2 px-4 py-2 rounded-2xl'> 
    Add Gcam
    </button>
    </div>
    </div>
    </>
  )
}

export default CreatePost