///returns list of agents no headers required
export default async function agents(req , res) {
    let { agentuuid } = req.headers
    if(agentuuid === undefined)
    agentuuid = ''
    const response = await fetch(`https://valorant-api.com/v1/agents/${agentuuid}`)
    const responseJson = await response.json()
    res.json(responseJson)
}