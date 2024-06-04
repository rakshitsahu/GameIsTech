import React from 'react'
import RankBoard from '../_components/RankBoard'
import Navbar from '../_components/navbar'
import GetAveragePlayerStats from '@/API/GetAveragePlayerStats'
import makeRequest from '@/API/makeRequest'
import { MONGO } from '@/API/API_States'
import { IPL_COLLECTION, IPL_DB } from '@/MongoDb/config'
import GetPlayersPlayedByYear from '@/API/GetPlayersPlayedByYear'

export async function getStaticProps(){
    const data = {}
   const playersList =  await GetPlayersPlayedByYear(['2023'])
   
      return {
        props :{
          playersList 
        },
      }
  }
function Players({playersList}) {
    const headings = ['Player Name' ,'Nationality' , 'IplDebut' , 'MatchesPlayed' ]
    const dataFields = ['Nationality' , 'IplDebut' , 'MatchesPlayed' ]

  return (
    <>
    <Navbar/>
    <div className=' mt-4 ml-2 mr-2'>
    <RankBoard headings={headings} playersJson = {playersList} dataFields={dataFields}/>
    </div>
    <div>Players</div>
    </>
  )
}

export default Players