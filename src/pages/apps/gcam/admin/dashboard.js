import React from "react";
import AdminNavbar from "@/Components/gcam/adminNavbar";
import { useState ,useEffect } from "react";
import { Button } from "react-bootstrap";
import TakeInput from "@/Components/gcam/pages/dashboard/takeInput";

import { CreatePageState } from "@/Components/gcam/EnumStates";
import { IoCloseCircle } from "react-icons/io5";
import { DeleteMany , FindAllOperation } from "@/API/POST_API_Manager";
import GCAM_DB_COLLECTION from "@/Components/gcam/mongodb/DB_Name_State";
import { Authorization } from "@/API/POST_API_Manager";
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
    collection : GCAM_DB_COLLECTION.Android_Versions
  }
  ,
  {
    name : 'Phone Brands',
    collection : GCAM_DB_COLLECTION.Phone_Brands
  },
  {
    name : 'Processor Brands',
    collection : GCAM_DB_COLLECTION.Processor_Brands
  },
  {
    name : 'Developer Names',
    collection : GCAM_DB_COLLECTION.Developer_Names
  },
  {
    name : 'Gcam Versions',
    collection : GCAM_DB_COLLECTION.Gcam_Version
  }

]
export const getServerSideProps = async ({ req , res }) =>{
  // Fetch data from external API
  const authentication = await Authorization(req , res)
  // const authentication = {status :200 , message  : 'user has been logged in'}
  

  return { props: { authentication } }
}
const Dashboard = ( {authentication} ) => {
  const [URL, setURL] = useState('')
  const [list , setList] = useState({})
  const [deletedList , setDeletedList] = useState([])
  const [name , setName] = useState('')
  const [collection , setCollection] = useState(GCAM_DB_COLLECTION.Android_Versions)
  const [currentOption , setCurrentOption] = useState('')
  useEffect( () => {
    console.log(collection)
    const data = makeRequest(collection)
    data.then((res)=>{
      setList(res)
      console.log(res)
    })
  }, [collection]);
  if(authentication.status != 200)
  return <div> user is not authorized </div>
  
  async function makeRequest(){
    const res = await FindAllOperation(collection)
    console.log('the result is', res)
    return res
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

  function  deleteItem(item , revert){
    document.getElementById(item.name).classList.remove('bg-teal-500')
    document.getElementById(item.name).classList.add('bg-red-400')
    if(!deletedList.includes(item.name))
    setDeletedList([...deletedList, item.name])
  }

  async function deleteListItems(){
    const data = {
      option : currentOption,
      deletedList : deletedList
    }
    await DeleteMany(collection , { name : { $in : deletedList }})
  }



  return (
    <>
      <AdminNavbar />

      <div className="grid grid-cols-3 h-screen content-center gap-4 drop-shadow-2xl m-3">
      <div className="  rounded-xl p-4 m-2  "> 
      <div className="flex justify-center inline-block">
      <div >
      <font> Enter The Android version  </font>
      <TakeInput  State = {CreatePageState.Androidversion} SetName = 'name' DbName />
      <font> Enter The processor Brand  </font>
      <TakeInput State = {CreatePageState.ProcessorBrands} SetName = 'name'/>
      <font> Enter The Phone Brands  </font>
      <TakeInput State = {CreatePageState.PhoneBrands} SetName = 'name'/>
      <font> Enter The Developer Name  </font>
      <TakeInput State = {CreatePageState.DeveloperNames} SetName = 'name'/>
      <font> Enter The Gcam Version  </font>
      <TakeInput State = {CreatePageState.GcamVersion} SetName = 'name'/>
      </div>
      </div>
      </div>
      <div className="grid items-center col-span-2 justify-center overflow-x-auto space-x-2 space-y-3">
      <div className=" grid grid-cols-4 gap-4 ">
      {Object.keys(options).map(  (option) => {
        return (
          
          <button key={option} id= {options[option].name} className="bg-emerald-500 hover:ring-1 active:bg-emerald-800 p-2 drop-shadow-2xl rounded-xl" onClick={() =>{
             setName(options[option].name) ,
             setCollection(options[option].collection),
             console.log('the collection is', options[option].collection),
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

        if(URL || collection){
          return <span key={iterator} id={list[iterator].name} className="grid hover:ring-1 active:bg-emerald-800  bg-teal-500 p-2 drop-shadow-2xl rounded-xl">
          <button className="justify-self-end" onClick={()=>{deleteItem(list[iterator])}}><IoCloseCircle/></button>
          <span className="justify-self-center">{list[iterator].name}
          
          </span>
          
          </span>
        }

      }) }
      
      </div>
      <button className="p-3 w-32 rounded-3xl bg-emerald-500 hover:ring-1 active:bg-emerald-800" onClick={deleteListItems}>Delete</button>
      </div>
      
      </div>


    </>
  );
};

export default Dashboard;
