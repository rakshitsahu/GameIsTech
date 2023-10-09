import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { getAgents } from '@/util/valorant/agents'
import { useRouter } from 'next/router'
import Navbar from '@/Components/valorant/Navbar'
const getAgent = async ( uuid )=>{
  try {

    const res = await axios.get( process.env.URL + '/api/valorant/agent/',{
      headers : {
        agentuuid : "e370fa57-4757-3604-3648-499e1f642d3f"
      }
    });

    return res.data;

  } catch (error) {

  }
}
const Agent =  () => {

    const [Agents , setAgents] = useState({})
    const [Agent , setAgent] = useState({})
    const router = useRouter()
    
    
    useEffect(  ()=>{
      //getAgents()
      const agentsJson = getAgents()
      agentsJson.then( async (json) => {
        if(!router.isReady) return;
        json.forEach( async (element) => {
            const CurrentName =  String(element.displayName)
            const AgentName = String(router.query.slug)

            if( CurrentName.toLocaleLowerCase() == AgentName.toLocaleLowerCase() )
            {

              
                const Result = getAgent(String(element.role.uuid) )
                Result.then( (element) =>{
                  setAgent(element)
                } )
                
            }
        }
        );
      } )
    },[router.isReady])

  return (
    <>
    <Navbar/>
    <div className='flex justify-center text-white'>
    <div className='bg-black grid w-1/2 m-5 p-3 gap-3 rounded-lg justify-items-center'>
    <h1 className='text-4xl'>{Agent.displayName}</h1>
    <div className='bg-white flex flex-wrap justify-center rounded-lg content-center'>
    <img src='https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/fullportrait.png' height='50%' width='40%'>
    </img>
    
    </div>
    <div> hello there </div>
    </div>
    </div>

    </>
  )
}

export default Agent