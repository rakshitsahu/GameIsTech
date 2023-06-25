import React from 'react'
import useInput from '../../Hooks/useInput';
import { Button } from 'react-bootstrap'
import { CreatePageState } from '../../EnumStates';

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
const TakeInput =  ({State , SetName}) => {
  const [name , list , changeName , changeList] = useInput();

  async function makeRequest(){
    let data = {}
    let trimmed = name.trim()
    switch (State) {
      
      case CreatePageState.Androidversion:
        AndroidStructure[SetName] = trimmed
        data = AndroidStructure
        break;
      case CreatePageState.PhoneBrands:
        PhoneBrandsStructure[SetName] = trimmed
        data = PhoneBrandsStructure
        break;
      case CreatePageState.ProcessorBrands:
        ProcessorBrandStructure[SetName] = trimmed
        data = ProcessorBrandStructure
        break;
      case CreatePageState.DeveloperNames:
        DeveloperNamesStructure[SetName] = trimmed
        data = DeveloperNamesStructure
        break;
      default:
        break;
    }
    const stateAndData = {
      data : data,
      state : State
    }

    // console.log('data is ', data)
    console.log('inserted again')
   await axios.post('http://localhost:3000/api/gcam/check' , stateAndData).then(
   async (e) =>{ 
   
  //  console.log('completed')
  }
   )

  //  await CreatePageStateManager(CreatePageState.Androidversion)
   
  }

  return (
    <div>
    {console.log(State)}
    <input type='text' value={name} className='w-72 h-12 rounded-lg text-lg text-black' onChange={changeName}/>
     <Button className='bg-emerald-600  drop-shadow-2xl p-3 rounded-lg m-3' onClick={() => { changeList() , makeRequest()}}>Add</Button> 
    </div>
  )
}

export default TakeInput