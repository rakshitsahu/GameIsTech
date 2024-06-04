import { CRICKET_API_STATE , MONGO } from "./API_States";
import { IPL_COLLECTION, IPL_DB } from "@/MongoDb/config";
import makeRequest from "./makeRequest";
import GetPlayersInfo from "./GetPlayersInfo";
let response = null;
export default async function GetPlayerStats(playerId){
    playerId = 1
    if(!response) return response
    response = await  GetPlayersInfo(playerId)
    const filter =  {}

    response = await makeRequest(MONGO.findAll , {
        db : IPL_DB.Static,
        collection : IPL_COLLECTION.StaticPlayerData,
        filter : filter

    } )
    if(response.status != 200){
        return null
    }
    const playersData = response.data[0]
    const result = playerId != null ? playersData[playerId] : playersData

    return 


}