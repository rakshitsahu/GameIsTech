import React from 'react'
import RankBoard from '../_components/RankBoard'
import Navbar from '../_components/navbar'
import GetAveragePlayerStats from '@/API/GetAveragePlayerStats'

export async function getStaticProps(){
    const data = {}
    console.log("Came here")
    await GetAveragePlayerStats()
      return {
        props :{
            data 
        },
      }
  }
function Players() {
    const headings = ['Player Name' ,'Sixes' , 'Rank' ]
    const dataFields = ['Sixes' , 'Rank' ]
    const playersJson = [{Image :'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/playerheadshot/ipl/210/1.png',
    Name : 'MS Dhoni',
    Sixes :'6',
    Rank : 1,
    },
    {
    Image :'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/playerheadshot/ipl/210/1.png',
    Name : 'Ishant Sharma',
    Rank : 1,
    Sixes :'6'
    },
    {Image :'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/playerheadshot/ipl/210/1.png',
    Name : 'MS Dhoni',
    Sixes :'6',
    Rank : 1,
    },
    {
    Image :'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/playerheadshot/ipl/210/1.png',
    Name : 'Ishant Sharma',
    Rank : 1,
    Sixes :'6'
    }]
  return (
    <>
    <Navbar/>
    <div className=' mt-4 ml-2 mr-2'>
    <RankBoard headings={headings} playersJson = {playersJson} dataFields={dataFields}/>
    </div>
    <div>Players</div>
    </>
  )
}

export default Players