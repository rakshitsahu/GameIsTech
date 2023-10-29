
// import GCAM_DB_STATE from "@/Components/gcam/mongodb/DB_Name_State";

import connectMongo from "../../../../../temp/ConnectMongo";
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority";
export async function handler(req , res){
    const Collection = "Admin"
    const data = {
        userName : "Rakshit",
        password : "$2b$10$9HO/psiMTiuFk3IRwk1NC.dFLqgltt3VqvPLtW8lKPyzC8nb3XYKi"
    }
    const filter = null
    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
      try {
        await client.connect().catch( async (err) => { await client.close(true) } )
        if(!filter)
        {
          await client.db('Gcam').collection(Collection).insertOne(data).then( (result) =>{
            res.send({message :"data has been inserted"})
          } ).catch((err)=> {
            res.send({message :"Error occured while inserting the data"})
           })
          
        }
        else
        {
          const result = await client.db('Gcam').collection(Collection).findOne(filter)
          if(!result)
          {
            await client.db('Gcam').collection(Collection).insertOne(data)
            res.send({message :"data has been inserted"})
          }
          else
          {
            res.send({message :"Already exists"})
          }
        }
        await client.close(true)
      } catch (error) {
        await client.close(true)
      }


}
export default handler