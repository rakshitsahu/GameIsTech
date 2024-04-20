import React from 'react'
import { useState } from 'react';
function RankBoard({headings , data ,dataFields }) {
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
          data.map(  (player , index) => { 

            return (
              <tr key={index} className=" odd:bg-gray-900  even:bg-gray-800 border-b border-gray-700">
              <td
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap text-white"
              >
              <div className='h-14 w-14 rounded-full bg-yellow-200 flex'>
              <img src={`${data[index].Image}`}/>
              <font className={`flex self-center ml-2 ${index == 0? 'text-yellow-500' : ''}`} >
              {data[index].Name.length > 8
                ? `${data[index].Name.slice(0, 8)}...`
                : data[index].Name
              }

              </font>
              </div>
              </td>

              {
                dataFields.map((field)=>{
                  return <td key={field}>
                  {
                    player[field]
                  }
                  </td>
                })
              }
              
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