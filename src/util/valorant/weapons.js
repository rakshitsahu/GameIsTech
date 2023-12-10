import axios from "axios";
const getWeapons = async () =>{
    try {
      const res = await axios.get('https://valorant-api.com/v1/weapons ');
      return res.data.data;
    } catch (error) {
     
    } 
  }
  export {getWeapons}