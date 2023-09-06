
// import GCAM_DB_STATE from "@/Components/gcam/mongodb/DB_Name_State";

import connectMongo from "../../../../../middleware/ConnectMongo";
import Readable from 'node:stream'
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority";
export async function handler(req , res){
  // console.log( 'the data of body string is ', req.body)
  // console.log( 'the type of body is ', typeof req.body)
  const body = req.body
  const collection = body.collection
  const filter = body.filter
  // console.log('find api has been called');
  // console.log('the collection of test api is' , body.collection )
  // console.log('the filter testapi is' , body.filter )
    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
      try {
        await client.connect().catch( async (err) => { 
          // console.log('the error occurred is', err)
          await client.close() 
        }
           )
        // console.log('request has been fetched successfully')
        const data = await client.db('Gcam').collection(collection).find(filter).toArray();
        await client.close()
        res.send({message :'success'})
        // console.log('test api worked successfully')
      } catch (error) {
        // console.log('error fetching data in test api' , error)

        await client.close()
        res.send({message :'failed'})
      }

}
export default handler