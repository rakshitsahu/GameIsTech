import React from 'react'

export default function DisplayDevelopers({developers}) {
  const colors = ['from-pink-500 to-violet-500', 'from-green-500 to-violet-500' , 'from-violet-500 to-pink-500' 
  , 'from-pink-500 to-green-500' , 'from-violet-500 to-red-500' , 'from-violet-500 to-green-500'
]
let color = Math.floor(Math.random() * colors.length)

  return (
    
    <div className='flex flex-wrap justify-center w-full rounded-md p-5 shadow-2xl drop-shadow-2xl gap-14 '>
    {
        Object.keys(developers).map(  (index) => {
        //console.log ( 'the brand is ', brands.index)
          return (

            <div key={index} value={developers[index].name} className='grid group/item bg-white rounded-full p-4'>
            <div  className={`flex justify-center bg-black text-3xl font-extrabold drop-shadow-2xl rounded-3xl p-5 bg-clip-text text-transparent bg-gradient-to-r ${colors[color++ % colors.length]}`}>
             {developers[index].name}  
             </div>
             <div className='group-hover/item:visible invisible font-thin underline underline-offset-2 decoration-purple-600 p-3'>
             Gcam Ports developed By {developers[index].name}
             </div>
            </div>

          );
        })
    }
    </div>
  )
  }