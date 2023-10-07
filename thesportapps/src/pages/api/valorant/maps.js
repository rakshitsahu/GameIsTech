///returns list of agents no headers required
import axios from "axios"
export default async function Maps(req , res) {

    const response = await axios.get( `https://valorant-api.com/v1/maps` , {
        params: {
          isPlayableCharacter: true
        }
      } )
      res.json(response.data.data)
}