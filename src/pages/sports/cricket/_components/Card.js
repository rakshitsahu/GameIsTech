import React from 'react'

function CardComp({data }) {

  return (
    <div className='w-full h-full bg-blue-700 transform -skew-x-[18deg] text-white around-shadow'>
     <div className='flex flex-col transform skew-x-[18deg] justify-center items-center'>
     {
        data.map((item, index)=>{
            return <div key={item} className='w-[80%] flex justify-between p-3'>
            <div>
            {item.key}
            </div>
            <div className='text-xl'>
            {item.value} <font className="text-sm">{item.desc}</font>
            </div>
            </div>
         })
     }
     </div>
    </div>
  )
}
export function SquareCard({data}) {
  return (
    <div className='w-full h-full bg-blue-700 text-white around-shadow'>
     <div className='flex flex-col justify-center items-center'>
     {
        data.map((item, index)=>{
            return <div key={item} className='w-[80%] flex justify-between p-3' >
            <div>
            {item.key}
            </div>
            <div className='text-xl'>
            {item.value} <font className="text-sm">{item.desc}</font>
            </div>
            </div>
         })
     }
     </div>
    </div>
  )
}
export default CardComp