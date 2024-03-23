import React, { PureComponent } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer ,  Brush,
    AreaChart,
    Area, } from 'recharts';

class CustomizedLabel extends PureComponent {
    render() {
      const { x, y, stroke, value } = this.props;
  
      return (
        <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
          {value}
        </text>
      );
    }
  }
  
  class CustomizedAxisTick extends PureComponent {
    render() {
      const { x, y, stroke, payload } = this.props;
  
      return (
        <g transform={`translate(${x},${y})`}>
          <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
            {payload.value}
          </text>
        </g>
      );
    }
  }
function DefaultLine(data){

    const renderCustomizedLabel = (props) => {
        const { x, y, stroke, payload } = props;
      
        return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
          {payload.value}
        </text>
      </g>
        );
      };

    return (
        <ResponsiveContainer width="100%" height="100%">
        <LineChart
        width="100%" 
        height="100%"
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" label={<CustomizedLabel />} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
      );
}
function SynchronizedChart(data){
    return (
        <div style={{ width: '100%' }}>
          <h4>A demo of synchronized AreaCharts</h4>
  
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              width={500}
              height={200}
              data={data}
              syncId="anyId"
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
          <p>Maybe some other content</p>
  
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              width={500}
              height={200}
              data={data}
              syncId="anyId"
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
              <Brush />
            </LineChart>
          </ResponsiveContainer>
  
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              width={500}
              height={200}
              data={data}
              syncId="anyId"
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      );
}
function LineComp({data , type}) {
    if(type == 'default'){
        return DefaultLine(data)
    }
    else if( type == 'synchronized'){
        return SynchronizedChart(data)
    }
}

export default LineComp