import React from 'react'
import RadarChartComp from '../../_components/charts/radar'
import RadicalProgressComp from '../../_components/charts/radical';
import AvatarComp from '../../_components/daisyUI/avatar';
import PieComp from '../../_components/charts/pie';
import LineComp from '../../_components/charts/Line';
import BarComp from '../../_components/charts/bar';
import CardComp, { SquareCard } from '../../_components/Card';
// import RankBoard from '../../_components/RankBoard';
import PastMatches from '../../_components/PastMatches';
import GetAveragePlayerStats from '@/API/GetAveragePlayerStats';
function getFullMarks(playerJson , averageJson ){
  const result = {}
  Object.keys(averageJson).forEach(key =>{
    var score = playerJson[key].replace('*', '').replace('-', '0')
    result[key] = Math.max(score , averageJson[key]) 
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

function statsSummary(statsJson , BattingPercentage, BowlingPercentage , playerName){

  const radarChartData = [
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
      A:  statsJson.playerBowlingStats["Econ"],
      B: statsJson.averageBowlingStats["Econ"],
      fullMark: statsJson.bowlingFullMarks["Econ"] ,
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
      A: statsJson.playerBattingStats['HS'].replace('*', ''),
      B: statsJson.averageBattingStats['HS'],
      fullMark: statsJson.battingFullMarks["HS"],
      ATopPercent : 91,
      ATopText : "Beats 80% of players"
    }
  ];
  const config = [
    {name : playerName , dataKey : 'A' , stroke:"#8884d8" , fill:"#8884d8"} ,
    {name : 'Average' , dataKey : 'B' , stroke:"#ff0000" , fill:"#ff0000"}
  ]
  const cardData = [
    {
      key : "Strike Rate",
      value: statsJson.playerBattingStats['SR'],
      desc: `( In top ${BattingPercentage['SR']}% )`
    },
    {
      key : "Runs",
      value: statsJson.playerBattingStats['Runs'],
      desc: `( In top ${BattingPercentage['Runs']}% )`
    },
    {
      key : "Wickets",
      value: statsJson.playerBowlingStats['WKTS'],
      desc: `( In top ${BowlingPercentage['WKTS']}% )`
    },
    {
      key : "Best",
      value: statsJson.playerBattingStats['HS'],
      desc: `( In top ${BattingPercentage['HS']}% )`
    }
  ]

  return (
    <div class="w-full">
    <div  className=' w-full'>
    <center>
    <div className='w-64 '>
    <CardComp data = {cardData}  />
    </div>
    <div  className=' w-[80%] max-w-[40rem] h-80'>
    <RadarChartComp data={radarChartData} config={config}/>
    </div>
    </center>
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

function battingStats(statsJson , BattingPercentage, playerMatchesHistory , playerName){
  setBoundryRuns(playerMatchesHistory.Batting)
  const barConfig = [
    {
      dataKey: runsByFoursKey,
       stackId:"a",
        fill:"#FFEA00",
    },
    {
      dataKey:runsBySixesKey,
      stackId:"a",
      fill:"#FF2323" 
    },
    {
      dataKey:"Runs",
      stackId:"a",
      fill:"#82ca9d" 
    }
  ]

  const radarChartData = [
    {
      subject: 'Strike Rate',
      A: statsJson.playerBattingStats["SR"],
      B: statsJson.averageBattingStats["SR"],
      fullMark: statsJson.battingFullMarks["SR"],
      ATopPercent : 51,
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
      A: statsJson.playerBattingStats['HS'].replace('*',''),
      B: statsJson.averageBattingStats['HS'],
      fullMark: statsJson.battingFullMarks["HS"],
      ATopPercent : 91,
      ATopText : "Beats 80% of players"
    }
  ];
  const config = [
    {name : playerName , dataKey : 'A' , stroke:"#8884d8" , fill:"#8884d8"} ,
    {name : 'Average' , dataKey : 'B' , stroke:"#ff0000" , fill:"#ff0000"}
  ]
  const configs = [
    {
    dataKey: 'Runs'
    }
  ]
  const cardData = [
    {
      key : "Strike Rate",
      value: statsJson.playerBattingStats['SR'],
      desc: `( In top ${BattingPercentage['SR']}% )`
    },
    {
      key : "Runs",
      value: statsJson.playerBattingStats['Runs'],
      desc: `( In top ${BattingPercentage['Runs']}% )`
    },
    {
      key : "Wickets",
      value: statsJson.playerBowlingStats['WKTS'],
      desc: `( In top ${BattingPercentage['WKTS']}% )`
    },
    {
      key : "Best",
      value: statsJson.playerBattingStats['HS'],
      desc: `( In top ${BattingPercentage['HS']}% )`
    }
    ,
    {
      key : "Half Centuries",
      value: statsJson.playerBowlingStats[50],
      desc: `( In top ${BattingPercentage['50']}% )`
    },
    {
      key : "Centuries",
      value: statsJson.playerBattingStats[100],
      desc: `( In top ${BattingPercentage['100']}% )`
    }
  ]

  const runsdata = [
    { name: "1's", value: 300 },
    { name: "2's", value: 200 },
    { name: "3's", value: 200 },
    { name: "6's", value: 400 },
    { name: "4's", value: 300 },

  ];
  return (
    <div class="w-full">
    <div  className=' w-full'>
    <center>

    <div className='w-64 '>
    <SquareCard data = {cardData} />
    </div>

    <div  className=' w-[80%] max-w-[40rem] h-80'>
    <RadarChartComp data={radarChartData} config={config}/>
    </div>
    <div className='w-full h-72'>
    <LineComp type ='default' data={playerMatchesHistory.Batting} configs={configs} />
    </div>

    <div className='w-full h-72'>
    <BarComp type ='default' data={playerMatchesHistory.Batting} config = {barConfig}  />
    </div>

    </center>
    </div>
    </div>
  )
}

function bowlingStats(statsJson , BowlingPercentage , playerName){

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
      A:  statsJson.playerBowlingStats["Econ"],
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
    {name : playerName , dataKey : 'A' , stroke:"#8884d8" , fill:"#8884d8"} ,
    {name : 'Average' , dataKey : 'B' , stroke:"#ff0000" , fill:"#ff0000"}
  ]
  const cardData = [
    {
      key : "Wickets",
      value: statsJson.playerBowlingStats['WKTS'],
      desc: `( In top ${BowlingPercentage['WKTS']}% )`
    },
    {
      key : "Economy",
      value: statsJson.playerBowlingStats['Econ'],
      desc: `( In top ${BowlingPercentage['Econ']}% )`
    },
    {
      key : "Balls",
      value: statsJson.playerBowlingStats['Balls'],
      desc: `( In top ${BowlingPercentage['Balls']}% )`
    },
    {
      key : "Runs",
      value: statsJson.playerBowlingStats['Runs'],
      desc: `( In top ${BowlingPercentage['Runs']}% )`
    },
    {
      key : "Economy",
      value: statsJson.playerBowlingStats['Econ'],
      desc: `( In top ${BowlingPercentage['Econ']}% )`
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
function playerLastMatches(playerMatchesHistory , playerStats , playersList){
  const headings = ['Player Name' ,'Sixes' ]
  return (
    <div>
    <div >
    <h2 className='text-2xl m-2 text-center'>{playerStats.Name} Batting performance in past matches</h2>
    <PastMatches matchHistory={playerMatchesHistory.Batting} playersList={playersList}/>
    </div>
    <div >
    <h2 className='text-2xl m-2 text-center'>{playerStats.Name} Bowling performance in past matches</h2>
  
    <PastMatches matchHistory={playerMatchesHistory.Bowling} isBowling={true} playerName={playerStats.Name} playersList={playersList}/>
   
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

function compareToTeams(playerPerformanceAgainstTeams , playersAverageVsTeams , playerName){

 function filterData(playerData , averageData){

  const radarChartJson = []
  Object.keys(playerData).forEach(( key , index )=>{
      const outOf = playerData[key] > averageData[key] ? playerData[key] : averageData[key]
      radarChartJson.push({subject : key , A : playerData[key] , B : averageData[key] , fullMark : outOf })
  })
  return radarChartJson
 }
 const config = [
  {name : playerName , dataKey : 'A' , stroke:"#8884d8" , fill:"#8884d8"} ,
  {name : 'Average' , dataKey : 'B' , stroke:"#ff0000" , fill:"#ff0000"}
]

  return (
    <div>
    
    

    <div className='flex flex-wrap gap-6'>
    {
      Object.keys(playerPerformanceAgainstTeams).map((team, index)=>{
        return <div key ={playerPerformanceAgainstTeams[team]} >
        <h3>
        <center>
        {playerName} performance against {team}
        </center>
        </h3>
        <div className='my-4 h-36 w-full'>
        <RadarChartComp data={[...filterData(playerPerformanceAgainstTeams[team] , playersAverageVsTeams[team]['Batting'])]} config={config}/>
        </div>
        </div>
      })
    }
    </div>
    </div>
  )
}

function PlayerAccordion({playerStats, averageStats, playerMatchesHistory , playerPerformanceAgainstTeams , playersAverageVsTeams, playersList }) {

  function handleNullScores(json){
    Object.keys(json).forEach((key)=>{
      json[key] = json[key].replace('-', '0')
    })
  }



  const averageBattingStats = averageStats["BattingAndFielding"]
  const averageBowlingStats = averageStats["BowlingStats"]
  const BattingPercentage = averageStats["BattingAndFieldingPercentage"]
  const BowlingPercentage = averageStats["BowlingStatsPercentage"]
  const playerBattingStats = playerStats["BattingAndFielding"][2023]
  const playerBowlingStats = playerStats["BowlingStats"][2023]
  handleNullScores(playerBowlingStats)
  const battingFullMarks = getFullMarks(playerBattingStats , averageBattingStats)
  const bowlingFullMarks = getFullMarks(playerBowlingStats , averageBowlingStats)
  const statsJson = {
    averageBattingStats : averageBattingStats,
    averageBowlingStats : averageBowlingStats,
    playerBattingStats : playerBattingStats,
    playerBowlingStats : playerBowlingStats,
    battingFullMarks : battingFullMarks,
    bowlingFullMarks : bowlingFullMarks
  }
  initData(statsJson)
  
  return (
    <div className="join join-vertical w-full">
    <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="my-accordion-4" defaultChecked /> 
    <div className="collapse-title text-xl font-medium">
      {playerStats.Name} Overall Stats
    </div>
    <div className="collapse-content "> 
    {statsSummary(statsJson , BattingPercentage, BowlingPercentage , playerStats.Name)}
  </div>
  </div>
  <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="my-accordion-4" defaultChecked /> 
    <div className="collapse-title text-xl font-medium">
      {playerStats.Name} Batting stats
    </div>
    <div className="collapse-content"> 
      {battingStats(statsJson , BattingPercentage , playerMatchesHistory , playerStats.Name)}
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border border-base-300">
  <input type="radio" name="my-accordion-4" /> 
  <div className="collapse-title text-xl font-medium">
      {playerStats.Name} Bowling Stats
  </div>
  <div className="collapse-content"> 
    {bowlingStats(statsJson, BowlingPercentage , playerStats.Name)}
  </div>
</div>

<div className="collapse collapse-arrow join-item border border-base-300">
<input type="radio" name="my-accordion-4" /> 
<div className="collapse-title text-xl font-medium">
    {playerStats.Name} Last Matches
</div>
<div className="collapse-content"> 
  {playerLastMatches(playerMatchesHistory , playerStats , playersList)}
</div>
</div>

  <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="my-accordion-4" /> 
    <div className="collapse-title text-xl font-medium">
        {playerStats.Name} performance against players
    </div>
    <div className="collapse-content"> 
      {comapreToPlayers()}
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="my-accordion-4" /> 
    <div className="collapse-title text-xl font-medium">
    {playerStats.Name} performance against IPL Teams
    </div>
    <div className="collapse-content"> 
    {compareToTeams(playerPerformanceAgainstTeams , playersAverageVsTeams , playerStats.Name)}
    </div>
  </div>
</div>
  )
}

export default PlayerAccordion