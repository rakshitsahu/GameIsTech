import { CRICKET_API_STATE , MONGO } from "./API_States";
import { IPL_COLLECTION, IPL_DB } from "@/MongoDb/config";
import makeRequest from "./makeRequest";
function convertValuesToFloat(json){
    Object.keys(json).forEach((key)=>{
        if(json[key] == '-'){
            json[key] = '0'
        }
        json[key] =json[key].replace('*', '')
        json[key] = parseFloat(json[key]);
    })
    return json
}
export default async function GetPlayersInfo(playerId = null , year = null){
   

    const filter =  {}

    const response = await makeRequest(MONGO.findAll , {
        db : IPL_DB.Static,
        collection : IPL_COLLECTION.StaticPlayerData,
        filter : filter

    } )
   
    if(response.status != 200){
        return null
    }
    const playersData = response.data[0]
 
    if(playerId != null && playersData[playerId]) {
        const result = playersData[playerId]
        result["BattingAndFielding"][2023] = convertValuesToFloat(result["BattingAndFielding"][2023])
        result["BowlingStats"][2023] = convertValuesToFloat(result["BowlingStats"][2023])
      return  result
    }
    else{
        
     return response.data[0]
    }
    const result = playerId != null ? playersData[playerId] : playersData
    const yearKey = year == null ? 'Career' : year
    return result


}