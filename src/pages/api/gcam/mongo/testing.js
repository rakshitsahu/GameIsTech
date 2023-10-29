import { AndroidVersionModel } from "@/MongoDb/Gcam/Models/AndroidVersion";
import mongoose from "mongoose";

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
export async function handler(req , res){
    await client.connect().then((v)=> console.log('connection done') ) .catch( async (err) => { console.log('connection failed') } )
    const itemsToInsert = ["heelllo", "thereee"];
    const updateOperation = {
      $push: {
        paths: { $each: itemsToInsert }
      }
    };
    
    const db = client.db('Indexing-DB');
    const collection = db.collection('indexedPaths');
    const response = await collection.updateOne({}, updateOperation, (updateErr, result) => {

      if (updateErr) {
        console.error('Error updating document:', updateErr);
        res.send({ message: "failed" });
      } else {

        res.send({ message: "success", result });
      }
    });
    res.send({ message: "failed" });
    
    await client.close(true)

}
export default handler