///returns list of agents no headers required
import axios from "axios"
export default async function agents(req , res) {
    let { agentuuid } = req.headers
    const response = await axios.get( `https://valorant-api.com/v1/agents/${agentuuid}` , {
        params: {
          isPlayableCharacter: true
        }
      } )
      res.json(response.data.data)
}