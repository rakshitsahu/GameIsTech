import axios from "axios";
const leaderboard = async( req , res ) => {
    res.send({message :"helllo"})
    const method = "GET";
    const options = {
        method:method,
        headers : {
            'X-Riot-Token' : 'RGAPI-ba2bc5ce-980b-4bad-b9cb-d9ca887ba0c5'
        },
        params : {
            size : 200,
            startIndex : 0
        }
    }
    try {
        const url = "https://ap.api.riotgames.com/val/ranked/v1/leaderboards/by-act/573f53ac-41a5-3a7d-d9ce-d6a6298e5704"
    const response = await fetch(url , options)
    console.log(response)
    } catch (error) {
        
    }
}
export {leaderboard}