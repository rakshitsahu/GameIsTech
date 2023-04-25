const getAgents = async ()=>{
    try {
      const res = await axios.get('https://valorant-api.com/v1/agents',{
        params: {
          isPlayableCharacter: true
        }
      });
      return res.data.data;
      //console.log(Agents.length)
    } catch (error) {
      console.log(error)
    }
  }
  export {getAgents}