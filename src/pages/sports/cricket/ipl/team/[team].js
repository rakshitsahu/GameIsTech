import React from 'react'
import Navbar from '../../_components/navbar'
import TeamAccordion from '../_components/TeamAccordion';
import { GetTeamNames } from '@/Components/Team';
import GetAverageFOW from '@/API/GetAverageFallOfWickets';
import { AverageCommentryStats } from '@/API/Commentry';
import makeRequest from '@/API/makeRequest';
import { MONGO } from '@/API/API_States';
import { IPL_COLLECTION, IPL_DB } from '@/MongoDb/config';
import GetPlayersInfo from '@/API/GetPlayersInfo';

function filterFow(json){
  const lineChartData = {}
  Object.keys(json).forEach((team)=>{
    if(!lineChartData[team]){
      lineChartData[team] = []
    }
    json[team]['fow'].forEach((stat)=>{

        lineChartData [team].push(stat)
        lineChartData [team] .push(stat)
    })
})
return lineChartData
}

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
function ProjectionOfPlayersIds(squad){
  const projection = {}
  Object.keys(squad).map((key) => {
    if (!Array.isArray(squad[key])) {
      return ;
    }
    squad[key].map((id) => {
      projection[id] = {
        Image : 1,
        Role : 1,
        Name : 1
      };
    })
  })
  return projection
}
export async function getServerSideProps(context) {
  const teamParam = context.params.team
  const teamNames = GetTeamNames(teamParam)
  const teamMatches = await GetAverageFOW('2023')
  const teamProjection = {}
  const filter = {}
  filter[teamNames.ShortName] = { $exists: true }
  teamProjection[teamNames.ShortName] = {2023 : 1}
  const teamData = await makeRequest(MONGO.findOne , {
    db : IPL_DB.Static,
    collection : IPL_COLLECTION.StaticTeamData,
    filter : filter,
    projection : teamProjection
  })

  const squad = teamData.data[teamNames.ShortName][2023]
  const playersProjection = ProjectionOfPlayersIds(squad)
  const playerDataResponse = await makeRequest(MONGO.findOne , {
    db : IPL_DB.Static,
    collection : IPL_COLLECTION.StaticPlayerData,
    filter : {},
    projection : playersProjection
  })
  const playersData = playerDataResponse.data

  const averageCommentry = await AverageCommentryStats(teamNames.ShortName)
  // const teamDetails = await GetTeamDetails()
  // const lineChartData = filterFow(teamMatches)
  return {
    props: {
      playersData,
      squad,
      teamNames,
      teamMatches,
      averageCommentry
    }
  };
}
function Team({playersData, squad ,teamNames, teamMatches , averageCommentry}) {
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
    <img src={`/sports/cricket/ipl/logo/${teamNames.ShortName}.png`} />
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
    <font> Name: </font> <font className="text-xl ">Chennai Super Kings</font>
    </div>
    <div>
    <font> Nationality: </font> <font className="text-xl ">Indian</font>
    </div>
    <div>
    <font> Role: </font> <font className="text-xl "></font>
    </div>
    <div>
    <font> DOB: </font> <font className="text-xl "></font>
    </div>
    <div>
    <font> Ipl Debut: </font> <font className="text-xl "></font>
    </div>
    </div>
    </div>
    </div>
    
      </div>
    
      <div className=' px-2 mt-1 '>
      <TeamAccordion playersData={playersData} squad={squad} teamNames= {teamNames} TeamComparisonData = {teamMatches} AverageCommentryStats={averageCommentry} />
    
      </div>
      </article>
    </div>
  )
}

export default Team