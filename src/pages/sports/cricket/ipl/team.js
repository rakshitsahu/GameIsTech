import React from 'react'
import Navbar from '../_components/navbar'
import Accordion from './_components/TeamAccordion'
import GetTeamsInfo from '@/API/GetTeamsInfo'
export async function getStaticProps(){
  await GetTeamsInfo()
  const data = {}
    return {
      props :{
          data 
      },
    }
}
function team() {
  const arr = []
  arr.push({
    desc : 'Top 70%'
  })
  return (
    <div className='overflow-x-hidden' style={{ fontFamily: 'Teko, sans-serif' }}>
    <Navbar />
      <article >
      <div class="flex w-full justify-center bg-[#0d121a] ">
    
    <div class="w-[80%] max-w-[35rem] p-3 m-4 bg-[#23272e] bg-blue-700 transform -skew-x-[18deg] flex justify-center items-center text-white gap-3">
      <div class="avatar transform skew-x-[18deg]  w-[40%]">
          <div class="w-full rounded-xl">
              <img src="https://etimg.etb2bimg.com/photo/89716039.cms" />
          </div>
      </div>
      <div className='flex flex-col gap-3 transform skew-x-[18deg]  w-[40%]'>
      <progress class="progress progress-secondary w-full text-white" value="0" max="100">erffgr</progress>
      <progress class="progress progress-yellow w-full" value="10" max="100"></progress>
      <progress class="progress progress-error w-full" value="40" max="100"></progress>
      <progress class="progress progress-success w-full" value="70" max="100"></progress>
      <progress class="progress progress-warning w-full" value="100" max="100"></progress>
      </div>
    </div>
    
      </div>
    
      <div className=' px-2 mt-1 '>
      <Accordion/>
    
      </div>
      </article>
    </div>
  )
}

export default team