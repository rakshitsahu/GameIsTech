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
      const unfiltered = res.data.data
      const filtered = {}
      for( let i = 0 ; i < unfiltered.length ;i++ ){
        if( unfiltered.isPlayableCharacter )
        filtered.push(unfiltered[i])
        console.log(unfiltered[i])
      }
      console.log(filtered)
      setAgents(filtered)
      console.log(filtered.length)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getdata()
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
        <img src={Agents[Agent].fullPortraitV2} className='self-auto overflow-clip shadow-2xl hover:scale-110 duration-500' alt="" />
        
        </div>
       }
        
        </span>
      );
    })}
</div>
    <span className='flex flex-wrap gap-3 justify-center bg-black rounded-lg p-3'>Block 2</span>
    <span className='flex flex-wrap gap-3 justify-center bg-black rounded-lg p-3'>Block 3</span>
    <span className='flex flex-wrap gap-3 justify-center bg-black rounded-lg p-3'>Block 4</span>
    </div>

    </div>
  )
}