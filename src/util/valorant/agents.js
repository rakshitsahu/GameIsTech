import axios from "axios";
const getAgents = async ( )=>{
    try {
      const res = await axios.get( process.env.URL + '/api/valorant/agents/');
      
      return res.data;
      
    } catch (error) {
      
      
    }
  }
  const getAgent = async ( agentuuid )=>{
    try {
      const res = await axios.get( process.env.URL + '/api/valorant/agent/',{
        headers : {
          agentuuid : agentuuid
        }
      });
      
      return res.data;
  
    } catch (error) {
      
    }
  }
  export {getAgents, getAgent}