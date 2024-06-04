import axios from "axios";
import { CRICKET_API_STATE , MONGO } from "./API_States";
import { IPL_COLLECTION } from "@/MongoDb/config";
async function request(url, collection , filter){
    const resultJSon = await axios.post(url,{
        collection : collection,
        filter : filter
    }).then(response => {
        return response.data
        })
      return resultJSon;
}
async function CRICKET_GET_API(state){
    switch (state) {
        case CRICKET_API_STATE.players:
        return await request(MONGO.findAll , IPL_COLLECTION.StaticPlayerData , {} )
        case CRICKET_API_STATE.teamDetails:
            return await request(MONGO.findAll , IPL_COLLECTION.StaticTeamData , {} )
        default:
            break;
    }
}