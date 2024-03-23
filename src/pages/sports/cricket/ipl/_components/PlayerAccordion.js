import React from 'react'
import RadarChartComp from '../../_components/charts/radar'
import RadicalProgressComp from '../../_components/charts/radical';
import AvatarComp from '../../_components/daisyUI/avatar';
import PieComp from '../../_components/charts/pie';
import LineComp from '../../_components/charts/Line';
import BarComp from '../bar';
import CardComp from '../../_components/Card';
function getFullMarks(playerJson , averageJson ){
  const result = {}
  Object.keys(playerJson).forEach(key =>{
    result[key] = Math.max(playerJson[key] , averageJson[key]) 
  })
  return result
}
var data
function initData(statsJson){
  console.log(statsJson)
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

function statsSummary(statsJson){
  const summaryDetails = ['Strike Rate' , 'Economy', 'Average Runs' , 'Average Wickets' , 'Highest Score']

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
  console.log(radarChartData)
  const config = [
    {name : 'Ms. Dhoni' , dataKey : 'A' , stroke:"#8884d8" , fill:"#8884d8"} ,
    {name : 'Average' , dataKey : 'B' , stroke:"#ff0000" , fill:"#ff0000"}
  ]
  const cardData = [
    {
      key : "Strike Rate",
      value: statsJson.playerBattingStats['SR'],
      desc: " ( In top 5% )"
    },
    {
      key : "Runs",
      value: statsJson.playerBattingStats['Runs'],
      desc: " ( In top 5% )"
    },
    {
      key : "Wickets",
      value: statsJson.playerBowlingStats['WKTS'],
      desc: " ( In top 5% )"
    },
    {
      key : "Best",
      value: statsJson.playerBattingStats['HS'],
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
    </div>
  )
}

function battingStats(){
  const lineData = [
    {
      name: '2008',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    
    {
      name: '2009',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: '2009',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: '2009',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: '2008',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: '2008',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: '2008',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const barConfig = [
    {
      dataKey:"six",
       stackId:"a",
        fill:"#8884d8",
    },
    {
      dataKey:"four",
      stackId:"a",
      fill:"#82ca9d" 
    },
    {
      dataKey:"three",
       stackId:"a",
        fill:"#8884d8",
    },
    {
      dataKey:"two",
      stackId:"a",
      fill:"#82ca9d" 
    },
    {
      dataKey:"one",
      stackId:"a",
      fill:"#82ca9d" 
    }
  ]
  const bardata = [
    {
      name: 'Page A',
      six: 4000,
      four: 2400,
      three: 2400,
      two: 2400,
      one: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      six: 3000,
      four: 1398,
      three: 2400,
      two: 2400,
      one: 2400,
      amt: 2210,
    },
    {
      name: 'Page C',
      six: 2000,
      four: 9800,
      three: 2400,
      two: 2400,
      one: 2400,
      amt: 2290,
    },
    {
      name: 'Page D',
      six: 2780,
      four: 3908,
      three: 2400,
      two: 2400,
      one: 2400,
      amt: 2000,
    },
    {
      name: 'Page E',
      six: 1890,
      four: 4800,
      three: 2400,
      two: 2400,
      one: 2400,
      amt: 2181,
    },
    {
      name: 'Page F',
      six: 2390,
      four: 3800,
      three: 2400,
      two: 2400,
      one: 2400,
      amt: 2500,
    },
    {
      name: 'Page G',
      six: 3490,
      four: 4300,
      three: 2400,
      two: 2400,
      one: 2400,
      amt: 2100,
    },
  ];

  const config = [
    {name : 'Ms. Dhoni' , dataKey : 'A' , stroke:"#8884d8" , fill:"#8884d8"} ,
    {name : 'Average' , dataKey : 'B' , stroke:"#ff0000" , fill:"#ff0000"}
  ]
  const defaultData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  const runsdata = [
    { name: "1's", value: 300 },
    { name: "2's", value: 200 },
    { name: "3's", value: 200 },
    { name: "6's", value: 400 },
    { name: "4's", value: 300 },

  ];
  const cardData = [
    {
      key : "Strike Rate",
      value: "158",
      desc: " ( In top 5% )"
    },
    {
      key : "Centuries",
      value: "40",
      desc: " ( In top 5% )"
    },
    {
      key : "Half-Centuries",
      value: "40",
      desc: " ( In top 5% )"
    },
    {
      key : "Runs",
      value: "500",
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
    <RadarChartComp data={data} config={config}/>
    </div>
    <div className='w-full h-72'>
    <LineComp type ='default' data={lineData}  />
    </div>

    <div className='w-full h-72'>
    <BarComp type ='default' data={bardata} config = {barConfig}  />
    </div>

    </center>
    </div>
    </div>
  )
}

function bowlingStats(){
  const config = [
    {name : 'Ms. Dhoni' , dataKey : 'A' , stroke:"#8884d8" , fill:"#8884d8"} ,
    {name : 'Average' , dataKey : 'B' , stroke:"#ff0000" , fill:"#ff0000"}
  ]
  const cardData = [
    {
      key : "Economy",
      value: "4.5",
      desc: " ( In top 5% )"
    },
    {
      key : "Wickets",
      value: "40",
      desc: " ( In top 5% )"
    },
    {
      key : "Best",
      value: "10/2",
      desc: " ( In top 5% )"
    },
    {
      key : "Runs",
      value: "500",
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
    <RadarChartComp data={data} config={config}/>
    </div>
    
    </center>
    </div>
    <div className='w-full justify-center flex gap-3 m-3 flex-wrap ' >
     {
      data.map((item , index)=>{
        return <div key={index} className='text-center'>
        <RadicalProgressComp  radius={6} value={item.ATopPercent} text={item.ATopText}/>
        <div>{item.subject}</div>
        </div>
      })
     }
    </div>
    </div>
  )
}
function playerLastMatches(){

  return (
    <div>
<center>
<h3 className='underline'>Hard Time With Bowlers</h3>
<div className='w-72 h-72 '>
<PieComp type ='twoLevel' />
</div>
<div className='w-full h-72'>
<PieComp type ='custom' data={data} />
</div>
</center>
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

function compareToTeams(){

  const playerVsteams = {
    "best" : [ "CSK" , "MI" , "LSG"],
    "worst" : [ "RR" , "PBKS" , "SRH"]
  }
  return (
    <div>
    <center>
    <h3 className='underline mt-5'>Below Average Performance Against Teams</h3>
    <div className='w-full h-72'>
    <PieComp type ='custom' data={data}  />
    </div>
    </center>
    <div className='flex gap-3 flex-wrap'>
    {
      playerVsteams.worst.map((team, index)=>{
        return <div key ={team} className='text-center'>
        <AvatarComp/>
        <div>
        Ms Dhoni vs {team} Stats
        </div>
        </div>
      })
    }
    </div>
    <center>
    <h3 className='underline mt-5'>Above Average Performance Against Teams</h3>
    </center>
    <div className='flex gap-3 flex-wrap'>
    {
      playerVsteams.worst.map((team, index)=>{
        return <div key ={team} className='text-center'>
        <AvatarComp/>
        <div>
        Ms Dhoni vs {team} Stats
        </div>
        </div>
      })
    }
    </div>
    </div>
  )
}

function Accordion({playerStats, averageStats}) {
  const averageBattingStats = averageStats["BattingAndFielding"]
  const averageBowlingStats = averageStats["BowlingStats"]
  const playerBattingStats = playerStats["BattingAndFielding"][2023]
  const playerBowlingStats = playerStats["BowlingStats"][2023]
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
  // console.log(averageStats)
  return (
    <div className="join join-vertical w-full">
    <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="my-accordion-4" defaultChecked /> 
    <div className="collapse-title text-xl font-medium">
      MS. Dhoni Overall Stats
    </div>
    <div className="collapse-content "> 
    {statsSummary(statsJson)}
  </div>
  </div>
  <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="my-accordion-4" defaultChecked /> 
    <div className="collapse-title text-xl font-medium">
      MS. Dhoni Batting stats
    </div>
    <div className="collapse-content"> 
      {battingStats()}
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border border-base-300">
  <input type="radio" name="my-accordion-4" /> 
  <div className="collapse-title text-xl font-medium">
      MS. Dhoni Bowling Stats
  </div>
  <div className="collapse-content"> 
    {bowlingStats()}
  </div>
</div>

<div className="collapse collapse-arrow join-item border border-base-300">
<input type="radio" name="my-accordion-4" /> 
<div className="collapse-title text-xl font-medium">
    MS. Dhoni Last Matches
</div>
<div className="collapse-content"> 
  {playerLastMatches()}
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
      {comapreToPlayers()}
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="my-accordion-4" /> 
    <div className="collapse-title text-xl font-medium">
    MS. Dhoni performance against IPL Teams
    </div>
    <div className="collapse-content"> 
    {compareToTeams()}
    </div>
  </div>
</div>
  )
}

export default Accordion