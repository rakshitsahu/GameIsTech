import React from 'react'
import RadarChartComp from '../../_components/charts/radar'
import RadicalProgressComp from '../../_components/charts/radical';
import AvatarComp from '../../_components/daisyUI/avatar';
import PieComp from '../../_components/charts/pie';
import LineComp from '../../_components/charts/Line';
import BarComp from '../bar';
import CardComp from '../../_components/Card';
import RankBoard from '../../_components/RankBoard';
import PastMatches from '../../_components/PastMatches';
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

function statsSummary(AverageCommentryStats){
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
      {name : 'GT Batting' , dataKey : 'A' , stroke:"#8884d8" , fill:"#8884d8"} ,
      {name : 'GT Bowling (Others vs GT)' , dataKey : 'B' , stroke:"#ff0000" , fill:"#ff0000"}
    ]
      return (
      <div>
      <center><h3 className='text-2xl'>Data based on {AverageCommentryStats.GT.matchesCount} Matches</h3></center>
      <div class="w-full flex flex-wrap">
      <div  className=' w-[80%] max-w-[25rem] h-80 '>
      <center><h4>PowerPlay</h4></center>
      <RadarChartComp data={filterData(AverageCommentryStats.GT.batting.powerPlay , AverageCommentryStats.GT.bowling.powerPlay)} config={config}/>
      </div>
      <div  className=' w-[80%] max-w-[25rem] h-80 '>
      <center><h4>Middle Overs</h4></center>
      <RadarChartComp data={filterData(AverageCommentryStats.GT.batting.middleOvers , AverageCommentryStats.GT.bowling.middleOvers)} config={config}/>
      </div>
      <div  className=' w-[80%] max-w-[25rem] h-80 '>
      <center><h4>Death Overs</h4></center>
      <RadarChartComp data={filterData(AverageCommentryStats.GT.batting.deathOvers , AverageCommentryStats.GT.bowling.deathOvers)} config={config}/>
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

function battingStats(AverageCommentryStats){
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
  {name : 'GT Batting' , dataKey : 'A' , stroke:"#8884d8" , fill:"#8884d8"} ,
  {name : 'GT Bowling (Others vs GT)' , dataKey : 'B' , stroke:"#ff0000" , fill:"#ff0000"}
]
 

  return (
    <div class="w-full flex flex-wrap">
    <div  className=' w-[80%] max-w-[25rem] h-80 '>
    <center><h4>PowerPlay</h4></center>
    <RadarChartComp data={filterData(AverageCommentryStats.GT.batting.powerPlay , AverageCommentryStats.GT.bowling.powerPlay)} config={config}/>
    </div>
    <div  className=' w-[80%] max-w-[25rem] h-80 '>
    <center><h4>Middle Overs</h4></center>
    <RadarChartComp data={filterData(AverageCommentryStats.GT.batting.middleOvers , AverageCommentryStats.GT.bowling.middleOvers)} config={config}/>
    </div>
    <div  className=' w-[80%] max-w-[25rem] h-80 '>
    <center><h4>Death Overs</h4></center>
    <RadarChartComp data={filterData(AverageCommentryStats.GT.batting.deathOvers , AverageCommentryStats.GT.bowling.deathOvers)} config={config}/>
    </div>
    </div>
  )
}

function bowlingStats(statsJson){
  const radarChartData = [
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
      subject: 'Balls',
      A: statsJson.playerBowlingStats["Balls"],
      B: statsJson.averageBowlingStats["Balls"],
      fullMark: statsJson.bowlingFullMarks["Balls"],
      ATopPercent : 71,
      ATopText : "Beats 80% of players"
    }
    ,
    {
      subject: 'Runs',
      A: statsJson.playerBowlingStats["Runs"],
      B: statsJson.averageBowlingStats["Runs"],
      fullMark: statsJson.bowlingFullMarks["Runs"],
      ATopPercent : 71,
      ATopText : "Beats 80% of players"
    }
    ,
    {
      subject: '4 Wickets',
      A: statsJson.playerBowlingStats["4W"],
      B: statsJson.averageBowlingStats["4W"],
      fullMark: statsJson.bowlingFullMarks["4W"],
      ATopPercent : 71,
      ATopText : "Beats 80% of players"
    },
    {
      subject: '5 Wickets',
      A: statsJson.playerBowlingStats["5W"],
      B: statsJson.averageBowlingStats["5W"],
      fullMark: statsJson.bowlingFullMarks["5W"],
      ATopPercent : 71,
      ATopText : "Beats 80% of players"
    }

    
  ];

  const config = [
    {name : 'Ms. Dhoni' , dataKey : 'A' , stroke:"#8884d8" , fill:"#8884d8"} ,
    {name : 'Average' , dataKey : 'B' , stroke:"#ff0000" , fill:"#ff0000"}
  ]
  const cardData = [
    {
      key : "Wickets",
      value: statsJson.playerBowlingStats['WKTS'],
      desc: " ( In top 5% )"
    },
    {
      key : "Balls",
      value: statsJson.playerBowlingStats['Balls'],
      desc: " ( In top 5% )"
    },
    {
      key : "Runs",
      value: statsJson.playerBowlingStats['Runs'],
      desc: " ( In top 5% )"
    },
    {
      key : "Economy",
      value: statsJson.playerBowlingStats['Econ'],
      desc: " ( In top 55% )"
    }
  ]
  return (
    <div class="w-full">
    <div  className=' w-full'>
    <center>
    <div className='w-64 '>
    <CardComp data = {cardData} />
    </div>
    <div  className=' w-[80%] max-w-[40rem] h-80'>
    <RadarChartComp data={radarChartData} config={config}/>
    </div>
    
    </center>
    </div>
    <div className='w-full justify-center flex gap-3 m-3 flex-wrap ' >
     {

     }
    </div>
    </div>
  )
}
function playerLastMatches(playerMatchesHistory){
  const headings = ['Player Name' ,'Sixes' ]
  const playersJson = [{
  Name : 'MS Dhoni',
  Rank : 1,
  },
  {
    Name : 'Ishant Sharma',
    Rank : 1
  },
  {
  Name : 'MS Dhoni',
  Rank : 1,
  },
  {
  Name : 'Ishant Sharma',
  Rank : 1,
  }]
  return (
    <div>
    <div >
    <h2 className='text-2xl m-2 text-center'>Batting performance in past matches</h2>
    <PastMatches matchHistory={playerMatchesHistory.Batting}/>
    </div>
    <div >
    <h2 className='text-2xl m-2 text-center'>Bowlong performance in past matches</h2>
  
    <PastMatches matchHistory={playerMatchesHistory.Bowling} isBowling={true}/>
   
    </div>
    </div>
  )
}
function comapreToPlayers(){
  return (
<div>
<center>
<h3 className='underline'>Hard Time With Bowlers</h3>
</center>
</div>
  )
}

function compareToTeams(TeamComparisonData){
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
    
    

    <div className='flex w-full h-96 bg-cyan-300'>
    <LineComp type ='default' configs={config} data={filteredData}  />
    </div>
    </div>
  )
}

function TeamAccordion({TeamComparisonData , AverageCommentryStats}) {

  return (
    <div className="join join-vertical w-full">
    <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="my-accordion-4" defaultChecked /> 
    <div className="collapse-title text-xl font-medium">
      Channai Super Kings Overall Stats
    </div>
    <div className="collapse-content "> 
    {statsSummary(AverageCommentryStats)}
  </div>
  </div>
  <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="my-accordion-4" defaultChecked /> 
    <div className="collapse-title text-xl font-medium">
      MS. Dhoni Batting stats
    </div>
    <div className="collapse-content"> 
      {battingStats(AverageCommentryStats)}
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border border-base-300">
  <input type="radio" name="my-accordion-4" /> 
  <div className="collapse-title text-xl font-medium">
      MS. Dhoni Bowling Stats
  </div>
  <div className="collapse-content"> 
    {''}
  </div>
</div>

<div className="collapse collapse-arrow join-item border border-base-300">
<input type="radio" name="my-accordion-4" /> 
<div className="collapse-title text-xl font-medium">
    MS. Dhoni Last Matches
</div>
<div className="collapse-content"> 
  {''}
</div>
</div>

<div className="collapse collapse-arrow join-item border border-base-300">
<input type="radio" name="my-accordion-4" /> 
<div className="collapse-title text-xl font-medium">
    MS. Dhoni Team
</div>
<div className="collapse-content"> 
  <p>hello</p>
</div>
</div>

  <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="my-accordion-4" /> 
    <div className="collapse-title text-xl font-medium">
        MS. Dhoni performance against players
    </div>
    <div className="collapse-content"> 
      {''}
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="my-accordion-4" /> 
    <div className="collapse-title text-xl font-medium">
    MS. Dhoni performance against IPL Teams
    </div>
    <div className="collapse-content"> 
    {compareToTeams(TeamComparisonData)}
    </div>
  </div>
</div>
  )
}

export default TeamAccordion