export default async function competitiveTiers(req , res){
    let { tieruuid } = req.headers
    if(tieruuid === undefined)
    tieruuid = ''
    const response = await fetch(`https://valorant-api.com/v1/competitivetiers/${tieruuid}`)
    const responseJson = await response.json()
    res.json(responseJson)
}