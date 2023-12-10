
// import GCAM_DB_STATE from "@/Components/gcam/mongodb/DB_Name_State";


import mongoose from "mongoose";
import { connectToMongo } from "@/MongoDb/MongoDB";
const uri = "mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority";
export async function handler(req , res){
    const collection = req.body.collection
    const filter = req.body.filter
      try {
        const client = connectToMongo('Gcam')
        await client.connect().catch( async (err) => { await client.close(true) } )
      const data = await client.collection(collection).deleteMany(filter);
      await client.close(true)
      res.send(data)
      } catch (error) {
        await client.close(true)
      }
    
}
export default handler