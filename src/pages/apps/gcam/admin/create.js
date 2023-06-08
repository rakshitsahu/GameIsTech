import React from 'react'
import { useState , useEffect } from 'react'
import { Button } from 'react-bootstrap'


function CreatePost() {
  const [deviceName , setDeviceName] = useState('')
  const [deleteDevice , setDeleteDevice] = useState('')
  const [deviceNameList , setDeviceNameList] = useState(['redmi' , 'xiaomu', 'leonovo'])
  const [flag , setFlag] = useState(false)
  const [processorName , setProcessorName] =  useState('')
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


  useEffect(() => {
    console.log('changed')
    setDeviceNameList(deviceNameList) // Side-effect!
  }, [deviceNameList.length]);

  return (
    <>
    <div className='place-content-center grid h-screen '>
    <div className='createPost'> 
    Create Post
    <div id = 'test'> Device Name : <input type='text' value={deviceName} className='w-72 h-12 rounded-lg text-lg text-black' onChange={onDeviceNameChange}/>
     <Button className='bg-blue-600 p-3 rounded-lg m-3' onClick={addDeviceName}>Add</Button> 
     </div>
     
    <div className='flex flex-wrap gap-3'> 
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
    <div id = 'test'> Developer Name : <input type='text'  className='w-72 h-12 rounded-lg text-lg text-black'/>
     </div>
    <div>  Processor :  
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

     <div>  Brand :  
  <select name="cars" defaultValue='makeChoice' value={processorName} onChange={(e) => setProcessorName(e.target.value) } className='m-2 bg-blue-600 p-4 rounded-xl' id="cars">
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

<div>  Android version :  
  <select name="cars" defaultValue='makeChoice' value={processorName} onChange={(e) => setProcessorName(e.target.value) } className='m-2 bg-blue-600 p-4 rounded-xl' id="cars">

    <option value="volvo">9.0</option>
    <option value="saab">8.0</option>
    <option value="mercedes">7.0</option>
    <option value="audi">6.2</option>

</select>

    <div className='gap-1'>
    Description : 
     <textarea className='rounded-lg' id="w3review" name="w3review" rows="4" cols="50">
    At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.
     </textarea>
    </div>
     </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default CreatePost