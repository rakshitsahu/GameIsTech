import makeRequest from "./makeRequest"

const { IPL_COLLECTION, IPL_DB } = require("@/MongoDb/config")
const { MONGO } = require("./API_States")



export default async function GetPlayersPlayedByYear(yearList){
    const playerDataResponse = await makeRequest(MONGO.findOne , {
      db : IPL_DB.Static,
      collection : IPL_COLLECTION.StaticPlayerData,
      filter : {}
    })
    const resultPlayers= []
    Object.keys(playerDataResponse.data).map((playerId)=>{
        const hasCommonYears = yearList.some(year => 
            Object.keys(playerDataResponse?.data?.[playerId]?.BattingAndFielding || {}).includes(year.toString())
        ) 
        || yearList.some(year => 
            Object.keys(playerDataResponse?.data?.[playerId]?.BowlingStats || {}).includes(year.toString())
        );
        if( hasCommonYears){
            resultPlayers.push({
                Name : playerDataResponse.data[playerId].Name,
                Image : playerDataResponse.data[playerId].Image,
                Nationality : playerDataResponse.data[playerId].Nationality,
                MatchesPlayed : playerDataResponse.data[playerId].MatchesPlayed,
                IplDebut :  playerDataResponse.data[playerId].IplDebut,
                Id :  playerDataResponse.data[playerId].Id
            })
        }
    })
    return  resultPlayers;
}