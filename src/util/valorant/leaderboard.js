import axios from "axios";
 const getLeaderboard = async () => {
    try {
      const config = {
        headers : {
          actid : "573f53ac-41a5-3a7d-d9ce-d6a6298e5704",
          startIndex : 0,
          size : 500,
          server : "na"
        }
      }
      const res = await axios.get( process.env.URL + '/api/valorant/leaderboard',config).then( (result)=>{ 
        return result
      } ) ;

      return res
    } catch (error) {

    }
  }
  export {getLeaderboard}