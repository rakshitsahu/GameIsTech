import React from 'react'
import { getAgents } from '@/util/valorant/agents'
import axios from 'axios'
import { useEffect , useState } from 'react'
import Navbar from '@/Components/valorant/Navbar'
export default function Agents() {
  const [Agents , setAgents] = useState({})
  useEffect( ()=>{
    //getAgents()
    const agentsJson = getAgents()
    agentsJson.then( (json) => {
      setAgents(json)
      console.log(json)
    } )
  },[])
  return (
    <>
    <Navbar/>
  
    <div className='bg-black flex flex-wrap m-5 p-3 gap-3 rounded-lg justify-center text-white'>
    {Object.keys(Agents).map(  (Agent) => {
      return (
        <div key={Agent}>
        
        { 
        Agents[Agent].isPlayableCharacter && <div className='grid justify-items-center rounded-xl bg-slate-900 p-3' > 
        <div className='h-52 w-52 rounded-lg shadow-2xl overflow-clip bg-red-500 border-2 hover:border-blue-700' >
        <img src={Agents[Agent].fullPortraitV2} className='self-auto overflow-clip shadow-2xl hover:scale-110 duration-500' alt="" />
        </div>
        <div >{Agents[Agent].displayName}</div>
        </div>
       }
       
        </div>
      );
    })}
    </div>
    </>
  )
}