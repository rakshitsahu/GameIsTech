import { CRICKET_API_STATE , MONGO } from "./API_States";
import { IPL_COLLECTION, IPL_DB } from "@/MongoDb/config";
import makeRequest from "./makeRequest";
let response = null;
export default async function GetMatchesResult(matchId = null){
    if(!response) return response
    const filter =  {}
    console.log("Came in GetPlayersInfo")
    response = await makeRequest(MONGO.findOne , {
        db : IPL_DB.MatchesResult,
        collection : IPL_COLLECTION.StaticPlayerData,
        filter : filter

    } )
    if(response.status != 200){
        return null
    }
    const MatchesResultData = response.data[0]
    // console.log(MatchesResultData)
    return matchId != null ? MatchesResultData[matchId] : MatchesResultData


}