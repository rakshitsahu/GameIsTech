import { CRICKET_API_STATE , MONGO } from "./API_States";
import { IPL_COLLECTION, IPL_DB } from "@/MongoDb/config";
import makeRequest from "./makeRequest";
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
    // if(teamHistoryReesponse) return teamHistoryReesponse
    const filter =  {}
    console.log("Came in GetPlayersInfo")
    const teamsData = await makeRequest(MONGO.findOne , {
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
async function getPlayerMatchesRuns(playerId , year , matchIds  , team){
    const filter = { matchId: { $in: matchIds } }
    const batting = []
    const bowling = []
   const matches = await makeRequest(MONGO.findOne , {
        db : IPL_DB.Matches,
        collection : year,
        filter : filter
    } )
    const matchesResult  = matches.data
    matchesResult.sort((a, b) => a.matchId.localeCompare(b.matchId));
    matchesResult.forEach((match)=>{
        if(match['details'][team].Batting[playerId]){
            batting.push(match['details'][team].Batting[playerId])
        }
        if(match['details'][team].Bowling[playerId]){
            bowling.push(match['details'][team].Bowling[playerId])
        }
    })
    return {Batting: batting , Bowling : bowling}
}
export async function GetPlayerMatchesHistory(playerId , year){
    // if(matchesHistoryResponse) return matchesHistoryResponse
    const filter = {}
    const playerTeamHistory = await GetPlayerTeamHistory(playerId)
    const teamMatches = await makeRequest(MONGO.findOne , {
        db : IPL_DB.MatchesResult,
        collection : year,
        filter : filter
    } )
    // const [playerTeamHistory, teamMatches] = await Promise.all([GetPlayerTeamHistory(playerId), makeRequest(MONGO.findOne , {
    //     db : IPL_DB.MatchesResult,
    //     collection : year,
    //     filter : filter
    // } )])
    
    const matchIds = teamMatches.data[0][year]["teamMatches"][playerTeamHistory[year]]
    const processedMatchIds = []
    matchIds.forEach((matchId)=>{
        
        processedMatchIds.push(matchId.toString())
    })

    const result =await  getPlayerMatchesRuns(playerId , year, processedMatchIds , playerTeamHistory[year])
    return result;
}