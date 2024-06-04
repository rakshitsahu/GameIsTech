import React from 'react'
import RadarChartComp from '../../_components/charts/radar'

import LineComp from '../../_components/charts/Line';
import { FaStar } from "react-icons/fa";
import Link from 'next/link';
function getFullMarks(playerJson , averageJson ){
  const result = {}
  Object.keys(playerJson).forEach(key =>{
    result[key] = Math.max(playerJson[key] , averageJson[key]) 
  })
  return result
}
var data
function initData(statsJson){
  data = [
    {
      subject: 'Strike Rate',
      A: statsJson.playerBattingStats["SR"],
      B: statsJson.averageBattingStats["SR"],
      fullMark: statsJson.battingFullMarks["SR"],
      ATopPercent : 51,
      ATopText : "Beats 80% of players"
    },
    {
      subject: 'Wickets',
      A: statsJson.playerBowlingStats["WKTS"],
      B: statsJson.averageBowlingStats['WKTS'],
      fullMark: statsJson.bowlingFullMarks["WKTS"],
      ATopPercent : 61,
      ATopText : "Beats 80% of players"
    },
    {
      subject: 'Economy',
      A: statsJson.playerBowlingStats["Econ"],
      B: statsJson.averageBowlingStats["Econ"],
      fullMark: statsJson.bowlingFullMarks["Econ"],
      ATopPercent : 71,
      ATopText : "Beats 80% of players"
    },
    {
      subject: 'Average Runs',
      A: statsJson.playerBattingStats['Runs'],
      B: statsJson.averageBattingStats['Runs'],
      fullMark: statsJson.battingFullMarks["Runs"],
      ATopPercent : 81,
      ATopText : "Beats 80% of players"
    },
    {
      subject: "50's",
      A: statsJson.playerBattingStats[50],
      B: statsJson.averageBattingStats[50],
      fullMark: statsJson.battingFullMarks[50],
      ATopPercent : 91,
      ATopText : "Beats 80% of players"
    },
    {
      subject: "100's",
      A: statsJson.playerBattingStats[100],
      B: statsJson.averageBattingStats[100],
      fullMark: statsJson.battingFullMarks[100],
      ATopPercent : 91,
      ATopText : "Beats 80% of players"
    },
    {
      subject: 'Matches Played',
      A: statsJson.playerBattingStats['Mat'],
      B: statsJson.averageBattingStats['Mat'],
      fullMark: statsJson.battingFullMarks["Mat"],
      ATopPercent : 91,
      ATopText : "Beats 80% of players"
    },
    {
      subject: 'Highest Score',
      A: statsJson.playerBattingStats['HS'],
      B: statsJson.averageBattingStats['HS'],
      fullMark: statsJson.battingFullMarks["HS"],
      ATopPercent : 91,
      ATopText : "Beats 80% of players"
    }
  ];

}

function statsSummary(teamNames , AverageCommentryStats){
  function filterData(battingJson , bowlingJson){
       return [
        {
          subject : 'Runs',
          A: battingJson.runs,
          B: bowlingJson.runs,
          fullMark:battingJson.runs,
        },
        {
          subject : 'wkts',
          A: battingJson.wkts,
          B: bowlingJson.wkts,
          fullMark:battingJson.wkts
        },
        {
          subject : 'rpo',
          A: battingJson.rpo,
          B: bowlingJson.rpo,
          fullMark:battingJson.rpo
        },
        {
          subject : 'fours',
          A: battingJson.fours,
          B: bowlingJson.fours,
          fullMark:battingJson.fours
        },
        {
          subject : 'sixes',
          A: battingJson.sixes,
          B: bowlingJson.sixes,
          fullMark:battingJson.sixes
        }
       ]
      }
      
    const config = [
      {name : `${teamNames.ShortName} Batting` , dataKey : 'A' , stroke:"#8884d8" , fill:"#8884d8"} ,
      {name : `${teamNames.ShortName} Bowling (Others vs ${teamNames.ShortName})` , dataKey : 'B' , stroke:"#ff0000" , fill:"#ff0000"}
    ]
      return (
      <div>
      <center><h3 className='text-2xl'>Data based on {AverageCommentryStats[teamNames.ShortName].matchesCount} Matches</h3></center>
      <div class="w-full flex flex-wrap">
      <div  className=' w-[80%] max-w-[25rem] h-80 '>
      <center><h4>PowerPlay</h4></center>
      <RadarChartComp data={filterData(AverageCommentryStats[teamNames.ShortName].batting.powerPlay , AverageCommentryStats[teamNames.ShortName].bowling.powerPlay)} config={config}/>
      </div>
      <div  className=' w-[80%] max-w-[25rem] h-80 '>
      <center><h4>Middle Overs</h4></center>
      <RadarChartComp data={filterData(AverageCommentryStats[teamNames.ShortName].batting.middleOvers , AverageCommentryStats[teamNames.ShortName].bowling.middleOvers)} config={config}/>
      </div>
      <div  className=' w-[80%] max-w-[25rem] h-80 '>
      <center><h4>Death Overs</h4></center>
      <RadarChartComp data={filterData(AverageCommentryStats[teamNames.ShortName].batting.deathOvers , AverageCommentryStats[teamNames.ShortName].bowling.deathOvers)} config={config}/>
      </div>
      </div>
      </div>
      )
}
const runsByFoursKey = "Runs By Four's"
const runsBySixesKey = "Runs By Six's"
function setBoundryRuns(jsonArray){
  jsonArray.forEach((json)=>{
    json[runsByFoursKey] = json['Fours'] * 4
    json[runsBySixesKey] =json['sixes'] * 6
  })
}

function battingStats(teamNames , AverageCommentryStats){
  function filterData(battingJson , bowlingJson){
   return [
    {
      subject : 'Runs',
      A: battingJson.runs,
      B: bowlingJson.runs,
      fullMark:battingJson.runs,
    },
    {
      subject : 'wkts',
      A: battingJson.wkts,
      B: bowlingJson.wkts,
      fullMark:battingJson.wkts
    },
    {
      subject : 'rpo',
      A: battingJson.rpo,
      B: bowlingJson.rpo,
      fullMark:battingJson.rpo
    },
    {
      subject : 'fours',
      A: battingJson.fours,
      B: bowlingJson.fours,
      fullMark:battingJson.fours
    },
    {
      subject : 'sixes',
      A: battingJson.sixes,
      B: bowlingJson.sixes,
      fullMark:battingJson.sixes
    }
   ]
  }
const config = [
  {name : `${teamNames.ShortName}` , dataKey : 'A' , stroke:"#8884d8" , fill:"#8884d8"} ,
  {name : 'Average of other teams' , dataKey : 'B' , stroke:"#ff0000" , fill:"#ff0000"}
]
 

  return (
    <div class="w-full flex flex-wrap">
    <div  className=' w-[80%] max-w-[25rem] h-80 '>
    <center><h4>PowerPlay</h4></center>
    <RadarChartComp data={filterData(AverageCommentryStats[teamNames.ShortName].batting.powerPlay , AverageCommentryStats.average.bowling.powerPlay)} config={config}/>
    </div>
    <div  className=' w-[80%] max-w-[25rem] h-80 '>
    <center><h4>Middle Overs</h4></center>
    <RadarChartComp data={filterData(AverageCommentryStats[teamNames.ShortName].batting.middleOvers , AverageCommentryStats.average.bowling.middleOvers)} config={config}/>
    </div>
    <div  className=' w-[80%] max-w-[25rem] h-80 '>
    <center><h4>Death Overs</h4></center>
    <RadarChartComp data={filterData(AverageCommentryStats[teamNames.ShortName].batting.deathOvers , AverageCommentryStats.average.bowling.deathOvers)} config={config}/>
    </div>
    </div>
  )
}

function bowlingStats(teamNames ,AverageCommentryStats){
  function filterData(battingJson , bowlingJson){
    return [
     {
       subject : 'Runs',
       A: battingJson.runs,
       B: bowlingJson.runs,
       fullMark:battingJson.runs,
     },
     {
       subject : 'wkts',
       A: battingJson.wkts,
       B: bowlingJson.wkts,
       fullMark:battingJson.wkts
     },
     {
       subject : 'rpo',
       A: battingJson.rpo,
       B: bowlingJson.rpo,
       fullMark:battingJson.rpo
     },
     {
       subject : 'fours',
       A: battingJson.fours,
       B: bowlingJson.fours,
       fullMark:battingJson.fours
     },
     {
       subject : 'sixes',
       A: battingJson.sixes,
       B: bowlingJson.sixes,
       fullMark:battingJson.sixes
     }
    ]
   }
 const config = [
   {name : `${teamNames.ShortName}` , dataKey : 'A' , stroke:"#8884d8" , fill:"#8884d8"} ,
   {name : 'Average of other teams' , dataKey : 'B' , stroke:"#ff0000" , fill:"#ff0000"}
 ]
  
 
   return (
     <div class="w-full flex flex-wrap">
     <div  className=' w-[80%] max-w-[25rem] h-80 '>
     <center><h4>PowerPlay</h4></center>
     <RadarChartComp data={filterData(AverageCommentryStats[teamNames.ShortName].batting.powerPlay , AverageCommentryStats.average.bowling.powerPlay)} config={config}/>
     </div>
     <div  className=' w-[80%] max-w-[25rem] h-80 '>
     <center><h4>Middle Overs</h4></center>
     <RadarChartComp data={filterData(AverageCommentryStats[teamNames.ShortName].batting.middleOvers , AverageCommentryStats.average.bowling.middleOvers)} config={config}/>
     </div>
     <div  className=' w-[80%] max-w-[25rem] h-80 '>
     <center><h4>Death Overs</h4></center>
     <RadarChartComp data={filterData(AverageCommentryStats[teamNames.ShortName].batting.deathOvers , AverageCommentryStats.average.bowling.deathOvers)} config={config}/>
     </div>
     </div>
   )
}


function compareToTeams(teamNames ,TeamComparisonData){
 function filterData(TeamComparisonData){

  const filterData = []
  for(let i = 0 ; i < 13 ;i++){
    Object.keys(TeamComparisonData).forEach(( team , index )=>{
      if(TeamComparisonData[team]['fow'].length <= i) return
      const json = {...TeamComparisonData[team]['fow'][i]}
      
      const tmp = {}
      tmp[team +'Runs'] = json['runs']
      tmp[team +'Wkts'] = i+1
      tmp[team +'Overs'] = json['overs']
      if(filterData.length <= i){
        filterData.push(tmp)
      }
      else{

        filterData[i] = {...filterData[i], ...tmp}
      }
        
    })
  }
  return filterData
 }
 const config = [
]
Object.keys(TeamComparisonData).forEach((teamName)=>{
  const runsKey = teamName + 'Runs'
  const oversKey = teamName + 'Overs'
  config.push({name : teamName , dataKey : runsKey , stroke:"#8884d8" , fill:"#8884d8", overs : oversKey})
})
  const filteredData = filterData(TeamComparisonData)
  return (
    <div>
    
    

    <div className='flex w-full h-96 '>
    <LineComp type ='default' configs={config} data={filteredData}  />
    </div>
    </div>
  )
}

function Squad(playersData,squad){
  
 return <div className='flex flex-wrap justify-center gap-2 w-full p-3 '>
 {
   Object.keys(squad).map((key) => {
     if (!Array.isArray(squad[key])) {
       return <div key={key}></div>; // Use 'key' as the key for the div
     }
     return squad[key].map((id) => { // Use 'squad[key]' directly for mapping
      
       return <div key={id}>
       <Link href={`/sports/cricket/ipl/player/${id}`}>
       <div  className='xl:w-52 lg:w-44 md:w-32 w-28 relative border-collapse border-2'>
       <div class="avatar">
        <div class="xl:w-52 lg:w-44 md:w-32 sm:w-28 rounded">
      <img src={playersData[id].Image} />
      </div>
        </div>

        <div class="w-full absolute bottom-0 py-0 justify-center items-center xl:bg-pink-300 lg:bg-yellow-300 md:to-blue-400 bg-red-400 gap-0">
        <div class="flex flex-col items-center text-white ">
          <div className='sm:text-base'>{playersData[id].Role}</div>
          <div className='sm:text-base'>{playersData[id].Name}</div>
        </div>
      </div>
      {
        squad.Captain === id &&
        <div className='absolute top-2 left-2'>
      <FaStar color='gold'/>
      </div>
      }
       </div>
       </Link>
       </div>; // Use 'id' as the key for the div
     });
   })
 }
</div>
}
function TeamAccordion({playersData, squad , teamNames , TeamComparisonData , AverageCommentryStats}) {
  return (
    <div className="join join-vertical w-full">
    <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="my-accordion-4" defaultChecked /> 
    <div className="collapse-title text-xl font-medium">
      {teamNames.FullName} Overall Stats
    </div>
    <div className="collapse-content "> 
    {statsSummary(teamNames, AverageCommentryStats)}
  </div>
  </div>
  <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="my-accordion-4" defaultChecked /> 
    <div className="collapse-title text-xl font-medium">
    {teamNames.FullName} Batting stats
    </div>
    <div className="collapse-content"> 
      {battingStats(teamNames ,AverageCommentryStats)}
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border border-base-300">
  <input type="radio" name="my-accordion-4" /> 
  <div className="collapse-title text-xl font-medium">
  {teamNames.FullName} Bowling Stats
  </div>
  <div className="collapse-content"> 
    {bowlingStats(teamNames ,AverageCommentryStats)}
  </div>
</div>

<div className="collapse collapse-arrow join-item border border-base-300">
<input type="radio" name="my-accordion-4" /> 
<div className="collapse-title text-xl font-medium">
{teamNames.FullName} Last Matches
</div>
<div className="collapse-content"> 
  {''}
</div>
</div>

<div className="collapse collapse-arrow join-item border border-base-300">
<input type="radio" name="my-accordion-4" /> 
<div className="collapse-title text-xl font-medium">
{teamNames.FullName} Squad
</div>
<div className="collapse-content "> 
  {Squad(playersData,squad)}
</div>
</div>

  <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="my-accordion-4" /> 
    <div className="collapse-title text-xl font-medium">
    {teamNames.FullName} performance against players
    </div>
    <div className="collapse-content"> 
      {''}
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="my-accordion-4" /> 
    <div className="collapse-title text-xl font-medium">
    {teamNames.FullName} performance against IPL Teams
    </div>
    <div className="collapse-content"> 
    {compareToTeams(teamNames , TeamComparisonData)}
    </div>
  </div>
</div>
  )
}

export default TeamAccordion