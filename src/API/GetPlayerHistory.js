import { CRICKET_API_STATE , MONGO } from "./API_States";
import { IPL_COLLECTION, IPL_DB } from "@/MongoDb/config";
import makeRequest from "./makeRequest";
import { GetTeamNames } from "@/Components/Team";
let teamHistoryReesponse = null;
let matchesHistoryResponse = null;
function isPlayerFound(playerId , data , year){
    let playerIdFound = false
    Object.keys(data[year]).forEach((role)=>{
        
        if(Array.isArray(data[year][role]) && data[year][role].includes(playerId)){
            playerIdFound = true
        }
        else if(typeof data[year][role] === 'string' &&  data[year][role] === playerId ){
            playerIdFound = true
        }

    })
    return playerIdFound
}



export default async function GetPlayerTeamHistory(playerId){
    const filter =  {}
    const teamsData = await makeRequest(MONGO.findAll , {
        db : IPL_DB.Static,
        collection : IPL_COLLECTION.StaticTeamData,
        filter : filter
    } )
    
    // 
    const result = teamsData.data[0];
  
    delete result._id
  
    const playerTeamHistoryJson = {}
    Object.keys(result).forEach(team => {
       Object.keys(result[team]).forEach( year => {
            const playerFound = isPlayerFound(playerId , result[team] , year)
            if(playerFound){

                playerTeamHistoryJson[year] = team
            }
        });
    });
   
    return playerTeamHistoryJson
}


function convertValuesToFloat(json){
    Object.keys(json).forEach((key)=>{
        json[key] = parseFloat(json[key])
    })
    return json
}
function getOpponentTeamName( json, currTeamName){
    let opponentTeam = null
    Object.keys(json).forEach((key)=>{
        
        const isTeamFound = GetTeamNames(key)

        if( isTeamFound != null && key != currTeamName){
            opponentTeam = key
            return;
        }
    })
    return opponentTeam
}
export async function GetPlayerVsTeamAverage(year){

    let averageJson = {}
    let countMap = {}
    
    function calculateAverage(json , dataFields , side,  vsTeam){


        if(!averageJson[vsTeam])
        {
            averageJson[vsTeam] = {}
        }
        if(!averageJson[vsTeam][side]){
            averageJson[vsTeam][side] = {}
        }
        let opponentsRun = 0
            
        Object.keys(json[side]).forEach((playerId)=>{
            countMap[vsTeam] = countMap[vsTeam] || 0
            countMap[vsTeam]++;

            if(!json[side])
            {

                return;
            }

            opponentsRun += parseInt(json[side][playerId]['Runs'])
            dataFields.forEach( element => {
                if(averageJson[vsTeam][side][element] == null){
                    averageJson[vsTeam][side][element] = 0
                }

                if(json[side][playerId][element] != '-')
                {
                    averageJson[vsTeam][side][element] += parseFloat(json[side][playerId][element])
                }
            });
        })

        return opponentsRun

    }
    function getAverageOfPlayers(matchList){
        averageJson = {}
        countMap = {}
        matchList.forEach((match)=>{
            const matchDetails = match.details
            const teams = []
            Object.keys(matchDetails).forEach((key)=>{
                if(GetTeamNames(key) != null){
                    teams.push(key)
                }
            })
            calculateAverage(matchDetails[teams[0]] , ['Runs','Balls','Fours', 'sixes', 'StrikeRate'] , 'Batting', teams[1] )
            calculateAverage(matchDetails[teams[1]] , ['Runs','Balls','Fours', 'sixes', 'StrikeRate'] , 'Batting', teams[0] )
            calculateAverage(matchDetails[teams[0]] , ['Overs','Runs','Wickets', 'Economy', 'Dots'] , 'Bowling', teams[1] )
            calculateAverage(matchDetails[teams[1]] , ['Overs','Runs','Wickets', 'Economy', 'Dots'] , 'Bowling', teams[0] )
        })

        Object.keys(averageJson).forEach((team)=>{
            Object.keys(averageJson[team]).forEach((side)=>{
   
                Object.keys(averageJson[team][side]).forEach((field)=>{

                    if(countMap[team] == 0){
                        averageJson[team][side][field] = 0
                    }
                    else{
                        averageJson[team][side][field] = averageJson[team][side][field] / countMap[team]
                    }
                })
            })
        })


        return averageJson

    }

    const filter = { }
    const batting = []
    const bowling = []
   const result = await makeRequest(MONGO.findAll , {
        db : IPL_DB.Matches,
        collection : year,
        filter : filter
    } )
    const matches  = result.data
    return getAverageOfPlayers([...matches])
    
}
async function getPlayerMatchesRuns(playerId , year , matchIds  , team){
    //remove the below line later
    GetPlayerVsTeamAverage(year)

    const filter = { matchId: { $in: matchIds } }
    const batting = []
    const bowling = []
   const matches = await makeRequest(MONGO.findAll , {
        db : IPL_DB.Matches,
        collection : year,
        filter : filter
    } )
    const matchesResult  = matches.data
    matchesResult.sort((a, b) => a.matchId.localeCompare(b.matchId));

    matchesResult.forEach((match)=>{
        const opponentTeam = getOpponentTeamName(match['details'] , team)

        if(match['details'][team].Batting[playerId]){
            const result = convertValuesToFloat(match['details'][team].Batting[playerId])
            result['VS'] = opponentTeam
            batting.push( result )
        }
        if(match['details'][team].Bowling[playerId]){
            const result = convertValuesToFloat(match['details'][team].Bowling[playerId])
            result['VS'] = opponentTeam
            bowling.push( result )
        }
    })
    
    return {Batting: batting , Bowling : bowling}
}
export async function GetPlayerMatchesHistory(playerId , year){

    const filter = {}
    const playerTeamHistory = await GetPlayerTeamHistory(playerId)
  
    const teamMatches = await makeRequest(MONGO.findAll , {
        db : IPL_DB.MatchesResult,
        collection : year,
        filter : filter
    } )

    
    const matchIds = teamMatches.data[0][year]["teamMatches"][playerTeamHistory[year]]
    const processedMatchIds = []
    matchIds.forEach((matchId)=>{
        
        processedMatchIds.push(matchId.toString())
    })

    const result =await  getPlayerMatchesRuns(playerId , year, processedMatchIds , playerTeamHistory[year])
    return result;
}