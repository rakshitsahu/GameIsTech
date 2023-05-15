import axios from "axios";
const getAgents = async ( )=>{
    try {
      const res = await axios.get('http://localhost:3000/api/valorant/agents/');
      //console.log(res.data)
      return res.data;
      //console.log(Agents.length)
    } catch (error) {
      console.log(error)
    }
  }
  const getAgent = async ( agentuuid )=>{
    try {
      const res = await axios.get('http://localhost:3000/api/valorant/agent/',{
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