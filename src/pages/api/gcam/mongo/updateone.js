
// import GCAM_DB_STATE from "@/Components/gcam/mongodb/DB_Name_State";

import connectMongo from "../../../../../middleware/ConnectMongo";
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority";
export async function handler(req , res){
    const collection = req.body.collection
    const filter = req.body.filter
    const Data = req.body.data
    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
      try {
        await client.connect().catch( async (err) => { await client.close(true) } )
        // console.log('the collection and filter is', collection , filter , Data)
        const data = await client.db('Gcam').collection(collection).updateOne( filter , Data );
        res.send(data)
        await client.close(true)
      } catch (error) {
        await client.close(true)
      }

}
export default handler