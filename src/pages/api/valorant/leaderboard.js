// required essentials in headers-> server , actid , startIndex , size
export default async function leaderboard(req, res) {

    const method = "GET";
    const options = {
        method:method,
        headers : {
            'X-Riot-Token' : 'RGAPI-4f0d3c90-3d38-413c-99cf-ce5c97cd58d0'
        }
    }
    try {
    const { server , actid , startindex , size } = req.headers
    const url = `https://${server}.api.riotgames.com/val/ranked/v1/leaderboards/by-act/${actid}?size=200&startIndex=${startindex}`
    const response = await fetch(url , options)
    const result = await response.json()
    res.status(200).json(result)
    } catch (error) {
        
    }
  }
  