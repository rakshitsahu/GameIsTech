import { CRICKET_API_STATE , MONGO } from "./API_States";
import { IPL_COLLECTION, IPL_DB } from "@/MongoDb/config";
import makeRequest from "./makeRequest";
let response = null;
export default async function GetTeamsInfo(team = null){
    if(!response) return response
    const filter =  {}
    console.log("Came in GetPlayersInfo")
    response = await makeRequest(MONGO.findOne , {
        db : IPL_DB.Static,
        collection : IPL_COLLECTION.StaticTeamData,
        filter : filter

    } )
    if(response.status != 200){
        return null
    }
    const TeamsData = response.data[0]
    console.log(TeamsData)
    return team != null ? TeamsData[team] : TeamsData


}