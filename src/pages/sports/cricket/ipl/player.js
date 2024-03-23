import React from 'react'
import Navbar from '../_components/navbar'
import Accordion from './_components/PlayerAccordion'
import GetPlayersInfo from '@/API/GetPlayersInfo';
import GetAveragePlayerStats from '@/API/GetAveragePlayerStats';

export async function getStaticProps() {
  try {
    // console.log("getStaticProps called")
    const playersStats = await GetPlayersInfo(177 , 2023)
    console.log(playersStats)
    const averageStats = await GetAveragePlayerStats()
    console.log(averageStats)
    const playerStats = playersStats
    // console.log(playerStats)
    return {
      props: {
        playerStats,
        averageStats
      },
      revalidate: 60 // Optional: specify revalidation period in seconds
    };
  } catch (error) {
    console.log('Error:', error.message);
    return {
      props: {
        error: 'Internal Server Error' // Pass an error message as props
      }
    };
  }
}
function Player({playerStats , averageStats , error}) {
  const arr = []
  console.log(playerStats)
  arr.push({
    desc : 'Top 70%'
  })
  return (
    <div className='overflow-x-hidden' style={{ fontFamily: 'Teko, sans-serif' }}>
    <Navbar />
      <article >
      <div class="flex w-full justify-center bg-[#0d121a] py-5">
    
    <div class="bg-blue-700 transform -skew-x-[12deg] w-[80%] max-w-[35rem] text-white mx-8 p-3">
    <div class="w-full bg-blue-700 bg-[#23272e]  flex justify-center items-center  gap-3">
   <div className='transform skew-x-[12deg]'>
   <div class="avatar">
  <div class="w-32 rounded-xl">
    <img src={playerStats.Image} />
  </div>
</div>
   </div>
      <div className='flex flex-col gap-3 transform skew-x-[15deg]  w-[40%]'>

      <progress class="progress progress-secondary w-full text-white" value="0" max="100">erffgr</progress>
      <progress class="progress progress-yellow w-full" value="10" max="100"></progress>
      <progress class="progress progress-error w-full" value="40" max="100"></progress>
      <progress class="progress progress-success w-full" value="70" max="100"></progress>
      <progress class="progress progress-warning w-full" value="100" max="100"></progress>
      </div>

    </div>
    <div className='flex w-full justify-center'>
    <div className='grid grid-cols-2 grid-rows-3  justify-center transform skew-x-[12deg] w-[18rem] '>
    <div>
    <font> Name: </font> <font className="text-xl ">{playerStats.Name}</font>
    </div>
    <div>
    <font> Nationality: </font> <font className="text-xl ">{playerStats.Nationality}</font>
    </div>
    <div>
    <font> Role: </font> <font className="text-xl ">{playerStats.Role}</font>
    </div>
    <div>
    <font> DOB: </font> <font className="text-xl ">{playerStats.Dob}</font>
    </div>
    <div>
    <font> Ipl Debut: </font> <font className="text-xl ">{playerStats.IplDebut}</font>
    </div>
    </div>
    </div>
    </div>
    
      </div>
    
      <div className=' px-2 mt-1 '>
      <Accordion playerStats={playerStats} averageStats={averageStats}/>
    
      </div>
      </article>
    </div>
  )
}

export default Player