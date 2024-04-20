import React from 'react'
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { FcInfo } from "react-icons/fc";
function scaleData(data , config){
  config.forEach(configElement => {
    data.forEach(
      dataElement =>{
        if(dataElement.fullMark === 0){
          dataElement[configElement.dataKey] = 0
        }
        else
        dataElement[configElement.dataKey] = (dataElement[configElement.dataKey] / dataElement.fullMark) * 100
      }
    )
  });
  return data;
}
function percentageToValue(percentage, total) {
  return (percentage / 100) * total;
}
const getIntroOfPage = (label) => {
  if (label === 'Page A') {
    return "Page A is about men's clothing";
  }
  if (label === 'Page B') {
    return "Page B is about women's dress";
  }
  if (label === 'Page C') {
    return "Page C is about women's bag";
  }
  if (label === 'Page D') {
    return 'Page D is about household goods';
  }
  if (label === 'Page E') {
    return 'Page E is about food';
  }
  if (label === 'Page F') {
    return 'Page F is about baby food';
  }
  return '';
};
const CustomTooltip = ({ active, payload, label }) => {

  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-blue-700 text-white rounded-md p-3">
        <center>
        {label}
        </center>
        
        <hr class="border-b-2 border-gray-300 my-4"></hr>
        <div className='flex flex-col gap-2'>
        {
          payload.map((element , index)=>{
   
            const originalValue = percentageToValue(element.value , element.payload.fullMark)
           return <div key={element} className='flex gap-2 justify-center items-center '>
            <div className={`w-4 h-4 rounded-full `} 
            style={ {backgroundColor: element.color} }></div>
            <div className=''>{element.name}</div>: <font className="ml-3">{originalValue.toFixed(2)}</font>
            </div>
          })
        }
        </div>
      </div>
    );
  }
}
function RadarChartComp({data , config , compareKeys}) {

  data = scaleData(data , config)

    
    return (
      <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Tooltip content={CustomTooltip} />
        {
          config.map((conf , index)=>{
            return <Radar key={index} name={conf.name} dataKey={conf.dataKey} stroke={conf.stroke} 
            fill={conf.fill} fillOpacity={0.3} scale={'A'} dot />
          })
        }
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
      )
}

export default RadarChartComp