import Link from 'next/link';
import React from 'react'
import { useState } from 'react';
function RankBoard({headings , playersJson ,dataFields }) {
  const [index , setIndex ] = useState(0)
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className=" w-full text-sm text-left rtl:text-right  ">
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
          playersJson.map(  (player , index) => { 

            return (
              <tr key={index} className=" odd:bg-gray-900  even:bg-gray-800 border-b border-gray-700">
              <td
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap text-white "
              >
              <div className=' rounded-full  flex text-center'>
              <Link href={`/sports/cricket/ipl/player/${player.Id}`}>
              <div class="avatar">
              <div class="w-14 rounded-xl">
                <img src={`${playersJson[index].Image}`} />
              </div>
            </div>
              </Link>
              
            
            <font className={`flex self-center ml-2`} >
            <Link href={`/sports/cricket/ipl/player/${player.Id}`}>
            {playersJson[index].Name
            }
            </Link>
            

            </font>
            
              </div>
              </td>

              {
                dataFields.map((field)=>{
                  return <td key={field} className=''>
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