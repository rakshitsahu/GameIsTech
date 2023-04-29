import React, { useEffect , useState } from 'react'
import {GiTrophyCup,GiTrapMask} from 'react-icons/gi'
import {TbMapSearch} from 'react-icons/tb'
import {IoSparklesSharp} from 'react-icons/io5'
import axios from 'axios'
import { getAgents } from './API/Agents/agents'
import { getWeapons } from './API/Weapons/weapons'
import { leaderboard } from './API/Leaderboard/leaderboard'
export default function Valorant() {
  const [Agents , setAgents] = useState({})
  const [Weapons , setWeapons] = useState({})
  const getActs = async () => {
    try {
      const res = await axios.get('https://ap.api.riotgames.com/val/ranked/v1/leaderboards/by-act/',{
        params: {
          actId: "0df5adb9-4dcb-6899-1306-3e9860661dd3"
        }
      }) ;
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect( ()=>{
    //getAgents()
    const agentsJson = getAgents()
    agentsJson.then( (json) => {
      setAgents(json)
    } )
    const weaponsJson = getWeapons()
    weaponsJson.then( (json) =>{
      setWeapons(json)
    } )
    const req = {
      server : "na" , from : 0 , to : 200 , actId : "573f53ac-41a5-3a7d-d9ce-d6a6298e5704"
    }
    leaderboard()
    //getActs()
  },[])
  
  return (
    <div className='bg-zinc-800'>
    <nav className='flex flex-wrap w-full bg-gray-700 text-white p-5 gap-3'>
    <span className='flex gap-2'><GiTrapMask className='self-center '/>Agents</span>
    <span className='flex gap-2'><TbMapSearch className='self-center '/> Maps</span>
    <span className='flex gap-2'> <IoSparklesSharp className='self-center '/>Skins</span>
    <span className='flex gap-2'> <GiTrophyCup className='self-center '/> Leaderboard </span>
    </nav>
    <div className="grid grid-cols-2 gap-3 mt-4 p-4 ">
    
    <div className='flex flex-wrap gap-3 justify-center bg-black rounded-lg p-3'>
    <div className='text-white w-full  text-xl'> <center>Agents</center> </div>
  
    {Object.keys(Agents).map(  (Agent) => {
      return (
        <span key={Agent}>
        
        { 
        Agents[Agent].isPlayableCharacter && <div className='h-24 w-24 rounded-full shadow-2xl overflow-clip bg-red-500 border-2 hover:border-blue-700' key={Agent}>
        <img src={Agents[Agent].displayIcon} className='self-auto overflow-clip shadow-2xl hover:scale-110 duration-500' alt="" />
        
        </div>
       }
        
        </span>
      );
    })}
</div>
<div className='flex flex-wrap gap-3 justify-center bg-black rounded-lg p-3'>
<div className='text-white w-full  text-xl'> <center>Weapons</center> </div>

{Object.keys(Weapons).map(  (Weapon) => {
  return (
    <span key={Weapon}>
    
    <div className='h-24 w-24 rounded-full shadow-2xl overflow-clip place-content-center bg-red-500 border-2 hover:border-blue-700' key={Weapon}>
    <img src={Weapons[Weapon].displayIcon} className= 'pt-7 overflow-clip shadow-2xl hover:scale-110 duration-500' alt="" />
    </div>
    </span>
  );
})}
</div>
    <span className='flex flex-wrap gap-3 justify-center bg-black rounded-lg p-3'>
    
    </span>
    <span className='flex flex-wrap gap-3 justify-center bg-black rounded-lg p-3'>Block 4</span>
    </div>

    </div>
  )
}