import React from 'react'
import Navbar from '../_components/navbar'
import CircularChart from '../_components/CircularChart'
import { Doughnut } from 'react-chartjs-2'
import RadicalProgress from '../_components/RadicalProgress'
function Stats() {
  const sourceData =[
    {
      "label": "Ads",
      "value": 32
    },
    {
      "label": "Subscriptions",
      "value": 45
    },
    {
      "label": "Sponsorships",
      "value": 23
    }
  ]
  const data = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        label: 'Dataset 1',
        data: 75,
        backgroundColor: ['#FF5733' , '#FF5733' , '#FF5733' , '#FF5733' , '#FF5733'],
      }
    ]
  }
  return (
    <>
    <div style={{ backgroundColor: '#0d121a' }} className='h-full w-full '>
    <Navbar/>
    <article className='p-3'>
    <div className='flex flex-row relative w-full h-full '>
    <span className='w-1/4 bg-orange-300 border-r border-white'>Left</span>
    <span className='w-1/2 bg-red-400 border-r border-white'>Middle
    {
      // <CircularChart value={0.75} color={'#3366cc'} size={200} />
    }
    {
    //   <Doughnut
    //   data={{
    //     labels: sourceData.map((data) => data.label),
    //     datasets: [
    //       {
    //         label: "Count",
    //         data: sourceData.map((data) => data.value),
    //         backgroundColor: [
    //           "rgba(43, 63, 229, 0.8)",
    //           "rgba(250, 192, 19, 0.8)",
    //           "rgba(253, 135, 135, 0.8)",
    //         ],
    //         borderColor: [
    //           "rgba(43, 63, 229, 0.8)",
    //           "rgba(250, 192, 19, 0.8)",
    //           "rgba(253, 135, 135, 0.8)",
    //         ],
    //       },
    //     ],
    //   }}
    //   options={{
    //     plugins: {
    //       title: {
    //         text: "Revenue Sources",
    //       },
    //     },
    //   }}
    // />
    }
    </span>
    <span className='w-1/4 bg-white'>
    <RadicalProgress percentage={60} radius="200"/>
    </span>
  </div>
    </article>

    </div>
    </>
  )
}

export default Stats