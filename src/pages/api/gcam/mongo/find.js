
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
      try {
        await client.connect().catch( async (err) => { 
          console.log('the error occurred is', err)
          await client.close() 
        }
           )
        console.log('request has been fetched successfully')
        const data = await client.db('Gcam').collection(collection).find(filter).toArray();
        await client.close()
        res.send(data)
      } catch (error) {
        console.log('error fetching data')
        await client.close()
      }

}
export default handler