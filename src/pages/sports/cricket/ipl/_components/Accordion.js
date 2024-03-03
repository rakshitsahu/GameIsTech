import React from 'react'
import RadarChartComp from '../../_components/charts/radar'
import RadicalProgressComp from '../../_components/charts/radical';
function statsSummary(){

  const data = [
    {
      subject: 'Strike Rate',
      A: 120,
      B: 110,
      fullMark: 150,
      ATopPercent : 51,
      ATopText : "Beats 80% of players"
    },
    {
      subject: 'Runs',
      A: 98,
      B: 130,
      fullMark: 150,
      ATopPercent : 60,
      ATopText : "Beats 80% of players"
    },
    {
      subject: 'Wickets',
      A: 86,
      B: 130,
      fullMark: 150,
      ATopPercent : 61,
      ATopText : "Beats 80% of players"
    },
    {
      subject: 'Economy',
      A: 99,
      B: 100,
      fullMark: 150,
      ATopPercent : 71,
      ATopText : "Beats 80% of players"
    },
    {
      subject: 'Average Runs',
      A: 85,
      B: 90,
      fullMark: 150,
      ATopPercent : 81,
      ATopText : "Beats 80% of players"
    },
    {
      subject: 'Average Wickets',
      A: 65,
      B: 85,
      fullMark: 150,
      ATopPercent : 91,
      ATopText : "Beats 80% of players"
    },
  ];
  const config = [
    {name : 'Ms. Dhoni' , dataKey : 'A' , stroke:"#8884d8" , fill:"#8884d8"} ,
    {name : 'Average' , dataKey : 'B' , stroke:"#ff0000" , fill:"#ff0000"}
  ]
  return (
    <div class="w-full">
    <div  className=' w-full'>
    <center>
    <div  className=' w-[80%] max-w-[40rem] h-80'>
    <RadarChartComp data={data} config={config}/>
    </div>
    </center>
    </div>
    <div className='w-full justify-center flex gap-4 m-3 flex-wrap ' >
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

function battingStats(){
  const data = [
    {
      subject: 'Strike Rate',
      A: 120,
      B: 110,
      fullMark: 150,
      ATopPercent : 40,
      ATopText : "Beats 80% of players"
    },
    {
      subject: 'Matches',
      A: 120,
      B: 110,
      fullMark: 150,
      ATopPercent : 51,
      ATopText : "Beats 20% of players"
    },
    {
      subject: 'Runs',
      A: 98,
      B: 130,
      fullMark: 150,
      ATopPercent : 71,
      ATopText : "Beats 30% of players"
    },
    {
      subject: 'Average Runs',
      A: 98,
      B: 130,
      fullMark: 150,
      ATopPercent : 76,
      ATopText : "Beats 99% of players"
    },
    {
      subject: "1s (One's)",
      A: 86,
      B: 130,
      fullMark: 150,
      ATopPercent : 81,
      ATopText : "Beats 90% of players"
    },
    {
      subject: "2s (Two's)",
      A: 99,
      B: 100,
      fullMark: 150,
      ATopPercent : 86,
      ATopText : "Beats 89% of players"
    },
    {
      subject: "3s (Three's)",
      A: 85,
      B: 90,
      fullMark: 150,
      ATopPercent : 91,
      ATopText : "Beats 19% of players"
    },
    {
      subject: "4s (Four's)",
      A: 65,
      B: 85,
      fullMark: 150,
      ATopPercent : 96,
      ATopText : "Beats 29% of players"
    },
    {
      subject: "6s (Six's)",
      A: 65,
      B: 85,
      fullMark: 150,
      ATopPercent : 97,
      ATopText : "Beats 39% of players"
    },
  ];
  const config = [
    {name : 'Ms. Dhoni' , dataKey : 'A' , stroke:"#8884d8" , fill:"#8884d8"} ,
    {name : 'Average' , dataKey : 'B' , stroke:"#ff0000" , fill:"#ff0000"}
  ]
  return (
    <div class="w-full">
    <div  className=' w-full'>
    <center>
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

function bowlingStats(){
  const data = [
    {
      subject: 'Wickets',
      A: 120,
      B: 110,
      fullMark: 150,
      ATopPercent : 40,
      ATopText : "Beats 80% of players"
    },
    {
      subject: 'Matches',
      A: 120,
      B: 110,
      fullMark: 150,
      ATopPercent : 60,
      ATopText : "Beats 80% of players"
    },
    {
      subject: 'Economy',
      A: 98,
      B: 130,
      fullMark: 150,
      ATopPercent : 70,
      ATopText : "Beats 80% of players"
    },
    {
      subject: 'Best',
      A: 47,
      B: 49,
      fullMark: 150,
      ATopPercent : 80,
      ATopText : "Beats 80% of players"
    },
    {
      subject: "Overs",
      A: 86,
      B: 130,
      fullMark: 150,
      ATopPercent : 92,
      ATopText : "Beats 80% of players"
    },
  ];
  const config = [
    {name : 'Ms. Dhoni' , dataKey : 'A' , stroke:"#8884d8" , fill:"#8884d8"} ,
    {name : 'Average' , dataKey : 'B' , stroke:"#ff0000" , fill:"#ff0000"}
  ]
  return (
    <div class="w-full">
    <div  className=' w-full'>
    <center>
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
  return (
    <div>
    <center>
    <h3 className='underline'>Hard Time Playing Against</h3>
    </center>
    </div>
  )
}

function Accordion({playerName}) {
  return (
    <div className="join join-vertical w-full">
    <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="my-accordion-4" defaultChecked /> 
    <div className="collapse-title text-xl font-medium">
      MS. Dhoni Overall Stats
    </div>
    <div className="collapse-content "> 
    {statsSummary()}
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