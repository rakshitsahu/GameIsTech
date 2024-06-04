import { CRICKET_API_STATE , MONGO } from "./API_States";
import { IPL_COLLECTION, IPL_DB } from "@/MongoDb/config";
import makeRequest from "./makeRequest";
let response = null;
export default async function GetMatchesResult(matchId = null){
    if(!response) return response
    const filter =  {}
    
    response = await makeRequest(MONGO.findAll , {
        db : IPL_DB.MatchesResult,
        collection : IPL_COLLECTION.StaticPlayerData,
        filter : filter

    } )
    if(response.status != 200){
        return null
    }
    const MatchesResultData = response.data[0]

    return matchId != null ? MatchesResultData[matchId] : MatchesResultData


}