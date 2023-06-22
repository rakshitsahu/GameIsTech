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
  const [deviceNameList , setDeviceNameList] = useState(['redmi' , 'xiaomu', 'leonovo'])

  const [processorName , setProcessorName] =  useState('')
  const [deviceBrand , setDeviceBrand] = useState('')
  function onDeviceNameChange(e){
    setDeviceName(e.target.value)
  }

  async function addDeviceName(){
    if(!deviceNameList.includes(deviceName))
    setDeviceNameList(current => [...current , deviceName ])
    setDeviceName('')
    console.log('device added')
    
  }

  const removeDeviceName = async (index) => {

    setDeviceNameList(oldValues => {
      return oldValues.filter((t, i) => i !== index)
    })
  }

  // async function onPostClick(){
  //   const Post = {
  //     name : deviceName,
  //     processor : processorName,
  //     brand : dev
  //   }
  // }

  async function onAddGcamClick(){
    

    const gcamData = { 
      developerName : gcamDeveloperName,
      name :gcamName,
      version : parseInt(gcamVersion),
      downloadLink : gcamDownloadLink,
      description : document.getElementById('gcam').value
    }
    console.log(gcamData)
    const stringJson = JSON.stringify(gcamData)
    const config = {
      headers :  {
        data : stringJson
      }
    }
    await axios.get('http://localhost:3000/api/gcam/gcamcheck', config).then(
      (result)=>{
        console.log('result is ' , result);
        return result
      }
    )

  }

  useEffect(() => {
    console.log('changed')
    setDeviceNameList(deviceNameList) // Side-effect!
  }, [deviceNameList.length]);

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
    <Button className='bg-blue-600 p-3 rounded-lg m-3' onClick={addDeviceName}>Add</Button> 
    </div>
    </div>

    <div className='flex flex-wrap gap-3 place-self-center'> 
    {
      deviceNameList.map((_device, index) => {
          return (
            <div className='p-2 rounded-xl bg-blue-500' key={_device} >{_device} 
          <Button className='p-2' onClick={()=>{removeDeviceName(index)}}> X</Button>
          </div>
          )
        })
      }
    devices included : {deviceNameList.length}
    </div>
    <div className='grid grid-cols-2'>
    <font className = 'self-center text-2xl'>Brand : </font> 

    <select name="cars" defaultValue='makeChoice' value={deviceBrand} onChange={(e) => setDeviceBrand(e.target.value) } className='m-2 bg-blue-600 p-4 rounded-xl' id="cars">
    <optgroup label="Xiaomi">
      <option value="volvo">Redmi</option>
      <option value="saab">Mi</option>
    </optgroup>
    <optgroup label="Google">
      <option value="mercedes">Pixel</option>
      <option value="audi">MTK 49</option>
    </optgroup>
    <optgroup label="Samsung">
      <option value="Galaxy">Galaxy</option>
      <option value="audi">MTK 49</option>
    </optgroup>
  </select>
    </div>
    <div>  
  
  <div className='grid grid-cols-2'>    

       </div>
      </div>

         <div className='grid grid-cols-2'>  
         <font className='self-center text-2xl'>Processor :</font> 
  <select name="cars" defaultValue='makeChoice' value={processorName} onChange={(e) => setProcessorName(e.target.value) } className='m-2 bg-blue-600 p-4 rounded-xl' id="cars">
  <optgroup label="Snapdragon">
    <option value="volvo">865</option>
    <option value="saab">420</option>
  </optgroup>
  <optgroup label="Mediatek">
    <option value="mercedes">MTK 42</option>
    <option value="audi">MTK 49</option>
  </optgroup>
  <optgroup label="Exionus">
    <option value="mercedes">MTK 42</option>
    <option value="audi">MTK 49</option>
  </optgroup>
</select>

     </div>
     <font className='place-self-center text-3xl font-thin mt-3  '>Google Camera Details</font>
    <div id = 'test' className='grid grid-cols-2'>
    <font className='self-center text-2xl'>Developer Name : </font>
    <input type='text' onChange={(e)=> setGcamDeveloperName(e.target.value)} className='w-72 h-12 rounded-lg text-lg text-black'/>
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
    <button onClick={()=>on} className='bg-indigo-500 px-4 py-2 rounded-2xl'> 
    Post
    </button>
    <button onClick={()=>onAddGcamClick()} className='bg-indigo-500 mx-2 px-4 py-2 rounded-2xl'> 
    Add Gcam
    </button>
    </div>
    </div>
    </>
  )
}

export default CreatePost