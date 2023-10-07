import React from 'react'
import useInput from '../../Hooks/useInput';
import { Button } from 'react-bootstrap'
import { CreatePageState } from '../../EnumStates';
import GCAM_DB_COLLECTION from '../../mongodb/DB_Name_State';
import { InsertOperation } from '@/API/POST_API_Manager';
import { useState } from 'react';
import axios from 'axios';

let AndroidStructure = { 
  name : ''
}
let PhoneBrandsStructure = {
  name : ''
}
let ProcessorBrandStructure = {
  name : ''
}
let DeveloperNamesStructure= {
  name : ''
}
// let GcamVersionStructure = {
//   name : '',
//   gcamIds : []
// }
let GcamVersionStructure = {
  name : ''
}
const TakeInput =  ({State , SetName}) => {
  const [name , list , changeName , changeList] = useInput();
  const [responseJson , setResponseJson] = useState({})
  async function makeRequest(){
    let data = {}
    let trimmed = name.trim()
    let DbName = ""
    switch (State) {
      
      case CreatePageState.Androidversion:
        AndroidStructure[SetName] = trimmed
        data = AndroidStructure
        DbName = GCAM_DB_COLLECTION.Android_Versions
        break;
      case CreatePageState.PhoneBrands:
        PhoneBrandsStructure[SetName] = trimmed
        data = PhoneBrandsStructure
        DbName = GCAM_DB_COLLECTION.Phone_Brands
        break;
      case CreatePageState.ProcessorBrands:
        ProcessorBrandStructure[SetName] = trimmed
        data = ProcessorBrandStructure
        DbName = GCAM_DB_COLLECTION.Processor_Brands
        break;
      case CreatePageState.DeveloperNames:
        DeveloperNamesStructure[SetName] = trimmed
        data = DeveloperNamesStructure
        DbName = GCAM_DB_COLLECTION.Developer_Names
        break;
      case CreatePageState.GcamVersion:
        GcamVersionStructure[SetName] = trimmed
        data = GcamVersionStructure
        DbName = GCAM_DB_COLLECTION.Gcam_Version
        console.log('gcam version structure is', data )
      default:
        break;
    }
    const stateAndData = {
      data : data,
      state : State
    }
    if(!data.name)
    {
      setResponseJson({message:'cant Post empty feild'})
      return;
    }
    console.log('inserted again')

  
  const res = await InsertOperation(DbName,data , data).then( (result) =>{
    console.log(result);
    return result
  })
  setResponseJson(res)

   
  }

  return (
    <div>
    {console.log(State)}
    <input type='text' value={name} className='w-72 h-12 rounded-lg text-lg text-black' onChange={changeName}/>
     <Button className='bg-emerald-600 hover:ring-1 active:bg-emerald-800 drop-shadow-2xl p-3 rounded-lg m-3' onClick={() => { changeList() , makeRequest()}}>Add</Button> {responseJson.message}
    </div>
  )
}

export default TakeInput