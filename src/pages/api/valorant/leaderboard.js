// required essentials in headers-> server , actid , startIndex , size
export default async function leaderboard(req, res) {

    const method = "GET";
    const options = {
        method:method,
        headers : {
            'X-Riot-Token' : 'RGAPI-d6c2f299-727f-41c6-bfbd-520fba9c79a2'
        }
    }
    try {
    const { server , actid , startindex , size } = req.headers
    const url = `https://${server}.api.riotgames.com/val/ranked/v1/leaderboards/by-act/${actid}?size=200&startIndex=${startindex}`
    const response = await fetch(url , options)
    const result = await response.json()
    res.status(200).json(result)
    //console.log(response) 573f53ac-41a5-3a7d-d9ce-d6a6298e5704
    } catch (error) {
        
    }
  }
  