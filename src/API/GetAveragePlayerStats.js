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

                    if(value == '')
                    {
                        value = 0
                    }

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

function GetTopPrecentageJson(playersJson , playerId , domain ,dataKeys , year ){
    const topPercentageJson = {}
    dataKeys.forEach(key =>{
        const playerScore = playersJson[playerId][domain][year][key]
       const percentage = GetTopPrecentage( playersJson, domain, key , playerScore , year ).toFixed(2)
       topPercentageJson[key] = percentage
    })
    return topPercentageJson
}

function CalculateTopPrecentage( dataArray , score){
    for(let i = 0 ; i < dataArray.length ;i++){
        if(typeof dataArray[i] === 'string'){
            dataArray[i] = dataArray[i].replace('*','').replace('-','')
            if(dataArray[i] == ''){
                dataArray[i] = '0'
            }
            dataArray[i] = parseFloat(dataArray[i])
    }
    if( score === 'string'){
        score = score.replace('*','').replace('-','')
        if(score == ''){
            score = '0'
        }
        score = parseFloat(score)
    }
}
    function sortNumericStrings(arr) {
        return arr.sort((a, b) => {
          return parseFloat(a) - parseFloat(b);
        });
      }
      sortNumericStrings(dataArray)
    let low = 0 , high = dataArray.length - 1;
    let mid = 0
    let ans = 0
    while ( low < high ){
        mid = Math.floor((high + low) / 2);
        if( dataArray[mid] <= score ){
            ans = mid
            low = mid + 1;
        } else{
            high = mid - 1;
        }
    }
    return 100 - ((ans / dataArray.length) * 100)
}
function GetTopPrecentage(playersData, battingOrBowlingKey, field , actualScore ,  year){
    let namesArray = Object.keys(playersData) 
    .filter(playerId => {return playersData[playerId][battingOrBowlingKey] && playersData[playerId][battingOrBowlingKey][year]})  
    .map(playerId => playersData[playerId][battingOrBowlingKey][year][field] || 0);

    return CalculateTopPrecentage(namesArray , actualScore)
}
export default async function GetAveragePlayerStats(playerId ,year){

    const response = await  GetPlayersInfo()
    const filter =  {}
    const playersData = response
    const BattingPercentageJson =  GetTopPrecentageJson(playersData , playerId, "BattingAndFielding",['Runs','4s','6s','Mat','HS','Avg','SR','50','100'] , year)
    const BowlingPercentageJson =  GetTopPrecentageJson(playersData , playerId, "BowlingStats",['Runs','4W','5W','Econ','WKTS','Ave','SR'] , year)
    const averageStatsJson = getAverageStats(playersData,year)

    return {
        ...averageStatsJson,
        "BattingAndFieldingPercentage" : BattingPercentageJson,
        "BowlingStatsPercentage" : BowlingPercentageJson
    }


}