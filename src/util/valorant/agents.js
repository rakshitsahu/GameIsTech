import axios from "axios";
const getAgents = async ( )=>{
    try {
      const res = await axios.get( process.env.URL + '/api/valorant/agents/');
      // console.log( 'the response of gameistech is ', res.data)
      return res.data;
      //console.log(Agents.length)
    } catch (error) {
      console.log('an error has been occured')
      console.log(error)
    }
  }
  const getAgent = async ( agentuuid )=>{
    try {
      const res = await axios.get( process.env.URL + '/api/valorant/agent/',{
        headers : {
          agentuuid : agentuuid
        }
      });
      //console.log(res.data)
      return res.data;
  
    } catch (error) {
      console.log(error)
    }
  }
  export {getAgents, getAgent}