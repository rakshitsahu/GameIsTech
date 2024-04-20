import { CRICKET_API_STATE , MONGO } from "./API_States";
import { IPL_COLLECTION, IPL_DB } from "@/MongoDb/config";
import makeRequest from "./makeRequest";
import GetPlayersInfo from "./GetPlayersInfo";
let response = null;
function containsSpecialCharacters(text) {
    var pattern = /[^a-zA-Z0-9\s]/;
    return pattern.test(text);
}

function getAverageFromJson(playersJson , category , yearKey){
    const averageStatsJson = {}
    const Roles = {}
    let totalCount = 0
    Object.keys(playersJson).forEach((key)=>{
        if(key == '_id'){
            return
        }
        if(playersJson[key]['Role'] != 'All-Rounder'){
            
            return
        }
        Roles[playersJson[key]['Role']] = true

        const BattingAndFielding = playersJson[key][category][yearKey]
     
        if(!BattingAndFielding ){

        }
        else{
            totalCount += 1
            Object.keys(BattingAndFielding).forEach((innerKey)=>{
                let value = BattingAndFielding[innerKey]
                if( value != '-'){
                    if (typeof value === 'string') {
                        value = value.replace('*', '')
                    }

                    // if(value == '')
                    // {
                    //     value = 0
                    // }

                    value = parseFloat(value);

                    if(!averageStatsJson.hasOwnProperty(innerKey)){
                        averageStatsJson[innerKey] = value
                    }
                    else{
                        averageStatsJson[innerKey] += value
                    }
                }
            })
        }

    })
    Object.keys(averageStatsJson).forEach((key)=>{
        averageStatsJson[key] =  averageStatsJson[key] / totalCount
        averageStatsJson[key].toFixed(2)
    })

    return averageStatsJson
}
function getAverageStats(playersJson , yearKey){
    
    
    let totalCount = 0

    const averageBattingStats = getAverageFromJson(playersJson , "BattingAndFielding" , yearKey)
    const averageBowlingStats = getAverageFromJson(playersJson , "BowlingStats" , yearKey)

    return {
        "BattingAndFielding" : averageBattingStats,
        "BowlingStats" : averageBowlingStats
    }

}
export default async function GetAveragePlayerStats(){
    if(response) return response
    response = await  GetPlayersInfo()
    const filter =  {}

   
    if(response.status != 200){
     
        return null
    }

    const playersData = response.data[0]
    const averageStatsJson = getAverageStats(playersData,2023)

    return averageStatsJson


}