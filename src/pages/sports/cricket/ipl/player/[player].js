import React from 'react'
import Navbar from '../../_components/navbar';
import PlayerAccordion from '../_components/PlayerAccordion';
import GetPlayersInfo from '@/API/GetPlayersInfo';
import GetAveragePlayerStats from '@/API/GetAveragePlayerStats';
import { GetPlayerMatchesHistory, GetPlayerVsTeamAverage } from '@/API/GetPlayerHistory';
import Footer from '../../_components/Footer';

function GetRunsAgainstTeams(jsonArray , dataFields){
  const countMap = {}
  const averageJson = {}
  jsonArray.forEach(json => {
    countMap[json['VS']] = countMap[json['VS']] || 0
    countMap[json['VS']]++
    averageJson[json['VS']] = averageJson[json['VS']] || {}
    dataFields.forEach(element => {
   
        averageJson[json['VS']][element] = averageJson[json['VS']][element] || 0
        averageJson[json['VS']][element] += json[element]
    });

  });

  Object.keys(averageJson).forEach((team)=>{
    Object.keys(averageJson[team]).forEach((element)=>{
      averageJson[team][element] = parseFloat((averageJson[team][element]/countMap[team]).toFixed(2))
    })
  })

  return averageJson
}

// export async function getStaticPaths() {
//   const paths = []; // Example function to fetch all post IDs
//   // Return an object with paths and fallback
//   return {

//     fallback: false // or true or 'blocking'
//   };
// }

function isNotValidPage(params , datFound){
  const events = ['ipl']
  return !events.includes(params[0]) || params[1] != 'player' ||  !datFound
}
export async function getServerSideProps(context) {

    const playerId = context.params.player
    
    const playersList = await GetPlayersInfo()
    // if(isNotValidPage(params , playersList)){
    //   return {
    //     notFound: true
    //   };
    // }

    const averageStats = await GetAveragePlayerStats(playerId , 2023)
    console.log(averageStats)
    const playerMatchesHistory = await GetPlayerMatchesHistory(playerId , '2023')
    const playerPerformanceAgainstTeams = GetRunsAgainstTeams(playerMatchesHistory.Batting , ['Runs', 'StrikeRate' , 'Balls' , 'Fours', 'sixes'])
    const playersAverageVsTeams = await GetPlayerVsTeamAverage('2023')
    const playerStats = playersList[parseInt(playerId)]
    
    return {
      props: {
        playerStats,
        averageStats,
        playerMatchesHistory,
        playerPerformanceAgainstTeams,
        playersAverageVsTeams,
        playersList
      }
    };

}
function Player({playerStats , averageStats, playerMatchesHistory, playerPerformanceAgainstTeams , playersAverageVsTeams ,playersList, error}) {
  const arr = []
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
      <PlayerAccordion playerStats={playerStats} 
      averageStats={averageStats} 
      playerMatchesHistory={playerMatchesHistory}
      playersAverageVsTeams= {playersAverageVsTeams}
      playerPerformanceAgainstTeams={playerPerformanceAgainstTeams}
      playersList={playersList}/>
    
      </div>
      </article>
      <Footer/>
    </div>
  )
}

export default Player