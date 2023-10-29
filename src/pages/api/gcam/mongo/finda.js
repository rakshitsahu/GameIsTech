
// import GCAM_DB_STATE from "@/Components/gcam/mongodb/DB_Name_State";

import connectMongo from "../../../../../temp/ConnectMongo";
import Readable from 'node:stream'
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority";
export async function handler(req , res){

  const body = req.body
  const collection = body.collection
  const filter = body.filter

    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
      try {
        await client.connect().catch( async (err) => { 

          await client.close() 
        }
           )
        const data = await client.db('Gcam').collection(collection).find(filter).toArray();
        await client.close()
        res.send({message :'success'})

      } catch (error) {
        await client.close()
        res.send({message :'failed'})
      }

}
export default handler