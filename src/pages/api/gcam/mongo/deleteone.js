
// import GCAM_DB_STATE from "@/Components/gcam/mongodb/DB_Name_State";

import connectMongo from "../../../../../middleware/ConnectMongo";
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority";
export async function handler(req , res){
    const Collection = req.body.Collection
    const filter = req.body.filter
    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
    const data = await client.db('Gcam').collection(Collection).deleteOne(filter);
    res.send(data)

}
export default connectMongo(handler)