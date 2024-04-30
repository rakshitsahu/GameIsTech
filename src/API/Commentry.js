import { CRICKET_API_STATE , MONGO } from "./API_States";
import { IPL_COLLECTION, IPL_DB } from "@/MongoDb/config";
import makeRequest from "./makeRequest";
import { GetTeamNames } from "@/Components/Team";
import cloneDeep from 'lodash/cloneDeep';
function extractDataFormJson(json){
    try{
        const [runsString , wktsString] = json.Score.split('/')
        const runs = parseInt(runsString)
        const wkts = parseInt(wktsString)
        const rpo = parseFloat(json.Rpo)
        const fours = parseInt(json.Fours)
        const sixes = parseInt(json.Sixes)
        const stat = {
                runs : runs,
                wkts : wkts,
                rpo : rpo,
                fours : fours,
                sixes : sixes,
    
        }
        return stat
    } catch(e){
        console.error(e.message)
        return {
            runs : 0,
            wkts : 0,
            rpo : 0,
            fours : 0,
            sixes : 0,
            }
    }
}
function getTeamData(teamData){
    function handleNull(){
        return {
            runs : 0,
            wkts : 0,
            rpo : 0,
            fours : 0,
            sixes : 0,
    }
    }
    const PowerPlay =teamData && teamData['powerPlay'] ? extractDataFormJson(teamData['powerPlay'][0]) : handleNull()
    const MiddleOvers =teamData &&  teamData['middleOvers'] ? extractDataFormJson(teamData['middleOvers'][0]) : handleNull()
    const DeathOvers =teamData && teamData['deathOvers'] ? extractDataFormJson(teamData['deathOvers'][0]) : handleNull()
    const data = {powerPlay : PowerPlay , middleOvers : MiddleOvers, deathOvers : DeathOvers}

    return data
}

function addScores(score1 , score2){
    return { runs : score1.runs + score2.runs , wkts : score1.wkts + score2.wkts,
         rpo : score1.rpo + score2.rpo , fours : score1.fours + score2.fours , sixes : score1.fours + score2.fours}
}
function calculateAverage(data , count){
    Object.keys(data).forEach((side)=>{
        
        Object.keys(data[side]).forEach((period) =>{
            Object.keys(data[side][period]).forEach((field)=>{
                data[side][period][field] = data[side][period][field] / count
            })
        })
    })
    return data
}
function updateResult(teamData , opponentData , resultJson ){

    if(!resultJson){
        resultJson = {'batting': {...teamData},'bowling' : {...opponentData} }
    }else{
        resultJson['bowling'].powerPlay = addScores(resultJson['bowling'].powerPlay , opponentData.powerPlay)
        resultJson['bowling'].middleOvers = addScores(resultJson['bowling'].middleOvers , opponentData.middleOvers)
        resultJson['bowling'].deathOvers = addScores(resultJson['bowling'].deathOvers , opponentData.deathOvers)
        resultJson['batting'].powerPlay = addScores(resultJson['batting'].powerPlay , teamData.powerPlay)
        resultJson['batting'].middleOvers = addScores(resultJson['batting'].middleOvers , teamData.middleOvers)
        resultJson['batting'].deathOvers = addScores(resultJson['batting'].deathOvers , teamData.deathOvers)
    }
    return resultJson
}
export async function AverageCommentryStats(avgForTeam ){

    const filter =  {}
    const response = await makeRequest(MONGO.findOne , {
        db : IPL_DB.Matches,
        collection : '2023',
        filter : filter
    } )

    const stats = {average : {} , stats : []}
    var result = {}
    const matchesCount = {}

    response.data.forEach(element => {

        try{
            
            if(!element.details.commentry ) {
               return;
            }
            const teams = Object.keys(element.details.commentry)
            if( !GetTeamNames(teams[0]) || !GetTeamNames(teams[1]) ) {
                return;
             }
            const team1Data = getTeamData(element.details.commentry[teams[0]])
            const team2Data = getTeamData(element.details.commentry[teams[1]])
            result[teams[0]] =  cloneDeep(updateResult(cloneDeep(team1Data), cloneDeep(team2Data), cloneDeep(result[teams[0]])))
            result[teams[1]] =  cloneDeep(updateResult(cloneDeep(team2Data) ,  cloneDeep(team1Data), cloneDeep(result[teams[1]])))

            if(!matchesCount[teams[0]]){
                matchesCount[teams[0]] = 0
            }
            if(!matchesCount[teams[1]]){
                matchesCount[teams[1]] = 0
            }
            matchesCount[teams[0]]++
            matchesCount[teams[1]]++
            
        }
        catch(e){
            console.log(e.message)
        }

        

    });

    try{
        const dataFields = {
            runs : 0,
            wkts : 0,
            rpo : 0,
            fours : 0,
            sixes : 0,
            }
        const matchData = {
            powerPlay : {
                ...dataFields
            },
            middleOvers : {
                ...dataFields
            },
            deathOvers :{
                ...dataFields
            }
        }
        let otherTeamsAverage = {
            batting : cloneDeep(matchData),
            bowling : cloneDeep(matchData)
        }
        Object.keys(matchesCount).forEach((teamName)=>{

            result[teamName] = {
                ...cloneDeep(calculateAverage(cloneDeep(result[teamName]) ,  matchesCount[teamName] )),
                matchesCount : matchesCount[teamName]
            }
            if(avgForTeam != teamName){
                otherTeamsAverage.batting.powerPlay = addScores(result[teamName].batting.powerPlay , otherTeamsAverage.batting.powerPlay)
                otherTeamsAverage.batting.middleOvers = addScores(result[teamName].batting.middleOvers , otherTeamsAverage.batting.middleOvers)
                otherTeamsAverage.batting.deathOvers = addScores(result[teamName].batting.deathOvers , otherTeamsAverage.batting.deathOvers)
                otherTeamsAverage.bowling.powerPlay = addScores(result[teamName].bowling.powerPlay , otherTeamsAverage.bowling.powerPlay)
                otherTeamsAverage.bowling.middleOvers = addScores(result[teamName].bowling.middleOvers , otherTeamsAverage.bowling.middleOvers)
                otherTeamsAverage.bowling.deathOvers = addScores(result[teamName].bowling.deathOvers , otherTeamsAverage.bowling.deathOvers)
            }
            
        })
        
        otherTeamsAverage = cloneDeep(calculateAverage(cloneDeep(otherTeamsAverage) ,  Object.keys(matchesCount).length - 1 ))
        result.average = otherTeamsAverage
    }
    catch(e){
        console.log(e.message)
    }
    

    return result;
}