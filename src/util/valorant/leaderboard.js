import axios from "axios";
 const getLeaderboard = async () => {
    try {
      const config = {
        headers : {
          actid : "573f53ac-41a5-3a7d-d9ce-d6a6298e5704",
          startIndex : 0,
          size : 5,
          server : "na"
        }
      }
      const res = await axios.get('http://localhost:3000/api/valorant/leaderboard',config) ;
      console.log(res)
      
    } catch (error) {
      console.log(error)
    }
  }
  export {getLeaderboard}