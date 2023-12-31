import React from 'react'
import { useState } from 'react';
function RankBoard({headings , playersJson}) {
  const [index , setIndex ] = useState(0)
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right  ">
      <thead className="text-xs  uppercase  bg-blue-600 text-white">
        <tr>
        {
          headings.map(  (index) => {
            return (
              <th key={index} scope="col" className="px-6 py-3">
                {
                  // console.log(headings[index]),
                  index
                }
              </th>
            );
          })
        }
        </tr>
        
      </thead>
      <tbody className='text-gray-400'>
        {
          playersJson.map(  (player , index) => { 
            // console.log(index)
            return (
              <tr key={index} className=" odd:bg-gray-900  even:bg-gray-800 border-b border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap text-white"
              >
              <div className='h-14 w-14 rounded-full bg-yellow-200 flex'>
              <img src={`${playersJson[index].Image}`}/>
              <font className={`flex self-center ml-2 text-yellow-500 `} >
              {playersJson[index].Name.length > 8
                ? `${playersJson[index].Name.slice(0, 8)}...`
                : playersJson[index].Name
              }

              </font>
              </div>
              </th>
              <td className="px-6 py-4">6</td>
    
              
            </tr>
            );
          })
        }



      </tbody>
    </table>
  </div>
  
  )
}

export default RankBoard