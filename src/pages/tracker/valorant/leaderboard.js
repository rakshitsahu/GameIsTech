import React  from 'react'
import { getLeaderboard } from '@/util/valorant/leaderboard'
import { useEffect , useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '@/Components/valorant/Navbar'

export const Leaderboard = () => {
  const [_leaderboard , _setLeaderboard] = useState({})
  const {query} = useRouter()
  console.log(query)
  // ************************* Local Function to call in Use effect ************************* 
  const storeLeaderboard = ()  =>{
    const result = getLeaderboard()
    result.then( (res) =>{
      _setLeaderboard(res)
    } )
  }
  // ***************************** end of fuction ***********************************

  useEffect( ()=>{

    const result = storeLeaderboard()

  },[])
  //console.log(result)
  return (
    <>
    <Navbar/>
    <div className='flex bg-black text-white'>
    {query.page}
    leaderboard
    </div>
    </>
    
  )
}


export default Leaderboard