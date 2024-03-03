import React from 'react'
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
function RadarChartComp({data , config}) {
  // const data = [
  //   {
  //     subject: 'Strike Rate',
  //     A: 120,
  //     B: 110,
  //     fullMark: 150,
  //   },
  //   {
  //     subject: 'Runs',
  //     A: 98,
  //     B: 130,
  //     fullMark: 150,
  //   },
  //   {
  //     subject: 'Wickets',
  //     A: 86,
  //     B: 130,
  //     fullMark: 150,
  //   },
  //   {
  //     subject: 'Economy',
  //     A: 99,
  //     B: 100,
  //     fullMark: 150,
  //   },
  //   {
  //     subject: 'Average Runs',
  //     A: 85,
  //     B: 90,
  //     fullMark: 150,
  //   },
  //   {
  //     subject: 'Average Wickets',
  //     A: 65,
  //     B: 85,
  //     fullMark: 150,
  //   },
  // ];

  // const config = [
  //   {name : 'Ms. Dhoni' , dataKey : 'A' , stroke:"#8884d8" , fill:"#8884d8"} ,
  //   {name : 'Average' , dataKey : 'A' , stroke:"#8884d8" , fill:"#8884d8"}
  // ]
  // console.log(data , config)
  //exdample of config data    <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} dot />
    return (
      <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Tooltip />
        {
          config.map((conf , index)=>{
            return <Radar key={index} name={conf.name} dataKey={conf.dataKey} stroke={conf.stroke} 
            fill={conf.fill} fillOpacity={0.3} dot />
          })
        }
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
      )
}

export default RadarChartComp