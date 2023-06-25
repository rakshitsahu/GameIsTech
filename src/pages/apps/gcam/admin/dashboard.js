import React from "react";
import AdminNavbar from "@/Components/gcam/adminNavbar";
import { useState ,useEffect } from "react";
import { Button } from "react-bootstrap";
import TakeInput from "@/Components/gcam/pages/dashboard/takeInput";
import AndroidVersionModel from "@/MongoDb/Gcam/Models/AndroidVersion";
import { CreatePageState } from "@/Components/gcam/EnumStates";
import { IoCloseCircle } from "react-icons/io5";
import axios from "axios";
function getButton(label){
  return <Button
  className="bg-blue-600 p-3 rounded-lg m-3"
  onClick={(e) => {
    setProcessorBrands(
      [...processorBrands, processorBrandName],
      setProcessorBrandName("")
    );
  }}
>
  Add
</Button>
}

const options = [
  {
    name : 'Android Versions',
    url : 'http://localhost:3000/api/gcam/androidversion'
  }
  ,
  {
    name : 'Phone Brands',
    url : 'http://localhost:3000/api/gcam/phonebrands'
  },
  {
    name : 'Processor Brands',
    url : 'http://localhost:3000/api/gcam/processorbrands'
  },
  {
    name : 'Developer Names',
    url : 'http://localhost:3000/api/gcam/developernames'
  }

]

const Dashboard = () => {
  const [URL, setURL] = useState('')
  const [list , setList] = useState({})
  const [deletedList , setDeletedList] = useState([])
  const [name , setName] = useState('')
  const [currentOption , setCurrentOption] = useState('')
  async function makeRequest(url){
    const res = await axios.get(url)
    return res.data
  }

  function handleCurrentOption(newOption){
    if( currentOption != '' )
    {
      document.getElementById(currentOption).classList.remove('bg-blue-500')
      document.getElementById(currentOption).classList.add('bg-emerald-500')
    }
    
      document.getElementById(newOption).classList.remove('bg-emerald-500')
      document.getElementById(newOption).classList.add('bg-blue-500')
    
    console.log(currentOption , newOption)
    setCurrentOption(newOption)
  }

  function  deleteItem(item){
    document.getElementById(item.name).classList.remove('bg-teal-500')
    document.getElementById(item.name).classList.add('bg-red-400')
    setDeletedList([...deletedList, item])
  }
  useEffect( () => {
    console.log(URL)
    const data = makeRequest(URL)
    data.then((res)=>{
      setList(res)
      console.log(res)
    })
  }, [URL]);

  return (
    <>
      <AdminNavbar />

      <div className="grid grid-cols-3 h-screen content-center gap-4 drop-shadow-2xl m-3">
      <div className="  rounded-xl p-4 m-2  "> 
      <div className="flex justify-center inline-block">
      <div >
      <font> Enter The Android version  </font>
      <TakeInput  State = {CreatePageState.Androidversion} SetName = 'name' />
      <font> Enter The processor Brand  </font>
      <TakeInput State = {CreatePageState.ProcessorBrands} SetName = 'name'/>
      <font> Enter The Phone Brands  </font>
      <TakeInput State = {CreatePageState.PhoneBrands} SetName = 'name'/>
      <font> Enter The Developer Name  </font>
      <TakeInput State = {CreatePageState.DeveloperNames} SetName = 'name'/>
      </div>
      </div>
      </div>
      <div className="grid items-center col-span-2 justify-center overflow-x-auto space-x-2 space-y-3">
      <div className=" grid grid-cols-4 gap-4 ">
      {Object.keys(options).map(  (option) => {
        return (
          
          <button key={option} id= {options[option].name} className="bg-emerald-500  p-2 drop-shadow-2xl rounded-xl" onClick={() =>{
             setName(options[option].name) ,
             setURL(options[option].url),
             handleCurrentOption(options[option].name)
             setDeletedList([])
            //  document.getElementById(options[option].name).classList.remove('bg-emerald-500')
            }} >
           {options[option].name} 
           </button>
        );
      })}
      </div>
      
      
      <div className="grid grid-cols-6 gap-4" >
      
      { Object.keys(list).map(  (iterator) => {

        if(URL){
          return <span key={iterator} id={list[iterator].name} className="grid   bg-teal-500 p-2 drop-shadow-2xl rounded-xl">
          <button className="justify-self-end" onClick={()=>{deleteItem(list[iterator])}}><IoCloseCircle/></button>
          <span className="justify-self-center">{list[iterator].name}
          
          </span>
          
          </span>
        }

      }) }
      
      </div>
      <button className="p-3 w-32 rounded-3xl bg-emerald-500 hover:bg-emerald-800 ">Delete</button>
      </div>
      
      </div>


    </>
  );
};

export default Dashboard;
