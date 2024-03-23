
import axios from "axios";
export default async function makeRequest(url, body){
  console.log("came in makeRequest ", url , body)
    const resultJSon = await axios.post(url,body).then(response => {
        return response
        })
        
      return resultJSon;
}