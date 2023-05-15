import React, { useEffect , useState } from 'react'
import {GiTrophyCup,GiTrapMask} from 'react-icons/gi'
import {TbMapSearch} from 'react-icons/tb'
import {IoSparklesSharp} from 'react-icons/io5'
import axios from 'axios'
import { getAgents } from '../../../util/valorant/agents'
import { getWeapons } from '../../../util/valorant/weapons'
import { getLeaderboard } from '../../../util/valorant/leaderboard'
import Navbar from '@/Components/valorant/Navbar'
export default function Valorant() {
  const [Agents , setAgents] = useState({})
  const [Weapons , setWeapons] = useState({})


  useEffect( ()=>{
    //getAgents()
    const agentsJson = getAgents()
    agentsJson.then( (json) => {
      setAgents(json)
      console.log(json)
    } )
    const weaponsJson = getWeapons()
    weaponsJson.then( (json) =>{
      setWeapons(json)
    } )
    getLeaderboard()
  },[])
  
  return (
    <>
    
    <Navbar/>
    <div className="grid grid-cols-2 gap-3 mt-4 p-4  ">
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
    </>
    
  )
}