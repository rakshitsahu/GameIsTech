import React from 'react'
import {
    BarChart,
    Bar,
    Brush,
    ReferenceLine,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';
function BrushBar(data , config){
    return (
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Brush dataKey="name" height={30} stroke="#8884d8" />
          {
            config.map((item, index)=>{
              return  <Bar key={index} dataKey={item.dataKey} stackId={item.stackId} fill={item.fill} />
            })
          }
        
        </BarChart>
      </ResponsiveContainer>
      );
}
function BarComp({data, config}) {
    return BrushBar(data , config)
}

export default BarComp