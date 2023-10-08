///returns list of agents no headers required
import axios from "axios"
export default async function agents(req , res) {
console.log("agents function has been called")
    const response = await axios.get( `https://valorant-api.com/v1/agents/` , {
        params: {
          isPlayableCharacter: true
        }
      } )
      res.json(response.data.data)
}