
// import GCAM_DB_STATE from "@/Components/gcam/mongodb/DB_Name_State";

import connectMongo from "../../../../../middleware/ConnectMongo";
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority";
export async function handler(req , res){
    const collection = req.body.collection
    const filter = req.body.filter
    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
    const data = await client.db('Gcam').collection(collection).find(filter).toArray();
    res.send(data)

}
export default connectMongo(handler)