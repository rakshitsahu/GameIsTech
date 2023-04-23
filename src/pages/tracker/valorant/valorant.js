import React, { useEffect , useState } from 'react'
import {GiTrophyCup,GiTrapMask} from 'react-icons/gi'
import {TbMapSearch} from 'react-icons/tb'
import {IoSparklesSharp} from 'react-icons/io5'
import axios from 'axios'

export default function Valorant() {
  const [Agents , setAgents] = useState({})
  const getdata = async ()=>{
    try {
      const res = await axios.get('https://valorant-api.com/v1/agents');
      setAgents(res.data.data)
      console.log(Agents.length)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getdata()
  },[])
  
  return (
    <>
    <nav className='flex flex-wrap w-full bg-gray-700 text-white p-5 gap-3'>
    <span className='flex gap-2'><GiTrapMask className='self-center '/>Agents</span>
    <span className='flex gap-2'><TbMapSearch className='self-center '/> Maps</span>
    <span className='flex gap-2'> <IoSparklesSharp className='self-center '/>Skins</span>
    <span className='flex gap-2'> <GiTrophyCup className='self-center '/> Leaderboard </span>
    </nav>
    <div className="grid grid-cols-2 gap-3 mt-4 p-4">
    
    <span className='flex flex-row  p-7 rounded-lg '>    <div className='flex flex-wrap gap-3 justify-center'>
    <div className='text-white w-full  text-xl'> <center>Agents</center> </div>
  
    {Object.keys(Agents).map(  (Agent) => {
      return (
        <div className='rounded-full flex-wrap shadow-2xl border-2 border-black' key={Agent}>
        { Agents[Agent].isPlayableCharacter && <div className='h-24 w-24 rounded-full shadow-2xl overflow-clip bg-red-500' key={Agent}>
        <img src={Agents[Agent].fullPortraitV2} className='self-auto overflow-clip shadow-2xl' alt="" />
        
        </div> }
        </div>
      );
    })}
</div></span>
    <span className='flex flex-row bg-blue-600'>Block 2</span>
    <span className='flex flex-row bg-blue-600'>Block 3</span>
    <span className='flex flex-row bg-blue-600'>Block 4</span>
    </div>

    </>
  )
}