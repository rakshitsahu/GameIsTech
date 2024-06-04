import { CRICKET_API_STATE , MONGO } from "./API_States";
import { IPL_COLLECTION, IPL_DB } from "@/MongoDb/config";
import makeRequest from "./makeRequest";
import { GetTeamNames } from "@/Components/Team";
let response = null;

function teamNamesList(keysList){
    const teamNames = []
    keysList.forEach(
        (key)=>{
            const teamNameJson = GetTeamNames(key)
            if(teamNameJson)
            {
                teamNames.push(key)
            }
        }
    )
    return teamNames
}
function addValuesOfJson( averageJson , json){
    const resultJson = {}
    Object.keys(json).forEach((key)=>{
        if(averageJson[key] != null){
            resultJson[key] = averageJson[key] + parseFloat(json[key]) 
        }else{
            resultJson[key] =  parseFloat(json[key])
        }
    })
    return resultJson
}
function calculateAverage(json){
    Object.keys(json).forEach((team)=>{
        json[team]['fow'].forEach((stat)=>{
            stat['runs'] = stat['runs'] / stat['count']
            stat['overs'] = stat['overs'] / stat['count']
            stat['runs'] = parseFloat(stat['runs'].toFixed(2))
            stat['overs'] = parseFloat(stat['overs'].toFixed(2))
        })
    })
}
function CalCulateStats(matchesList){
    const teamsAverageFowJson = {}
    matchesList.forEach(match => {
        if(!match.details) return
        const teamNames = teamNamesList(Object.keys(match.details))
        for(let i = 0 ; i < teamNames.length ;i++){
            const teamName = teamNames[i]
            
            if(!match.details[teamName]['fow']){

                continue
            }
            const wickets = match.details[teamName]['fow']
            if(wickets){
                
                if(!teamsAverageFowJson[teamName]){
                    teamsAverageFowJson[teamName] ={ }
                    teamsAverageFowJson[teamName]['fow'] = []
                }
                const averageFow = [...teamsAverageFowJson[teamName]['fow']]
                for(let i = 0; i < wickets.length ; i++ ){
                    if( averageFow.length <= i){
                        averageFow.push({
                            'overs' : parseFloat(wickets[i]['overs']),
                            'runs' : parseFloat(wickets[i]['runs']),
                            'count' : 1
                        })
                        continue
                    }
                    if(!averageFow[i].hasOwnProperty('runs')){
                        averageFow[i]['runs'] = 0
                    }
                    if(!averageFow[i].hasOwnProperty('overs')){
                        averageFow[i]['overs'] = 0
                    }
                    averageFow[i]['runs'] = averageFow[i]['runs'] + parseFloat(wickets[i]['runs'])  
                    averageFow[i]['overs']  = averageFow[i]['overs'] + parseFloat(wickets[i]['overs'])
                    averageFow[i]['count']++
                    
                }

                teamsAverageFowJson[teamName]['fow'] = averageFow


            }

        }
        
    });
    calculateAverage(teamsAverageFowJson)
    return teamsAverageFowJson

}
export default async function GetAverageFOW(){
    
    const filter =  {}
    const response = await makeRequest(MONGO.findAll , {
        db : IPL_DB.Matches,
        collection : '2023',
        filter : filter
    } )
    if(response.status != 200){
        return null
    }
    const Matches = response.data
    const result = CalCulateStats(Matches)
    return result
}
