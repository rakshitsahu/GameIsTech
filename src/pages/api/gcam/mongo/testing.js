import { AndroidVersionModel } from "@/MongoDb/Gcam/Models/AndroidVersion";
import mongoose from "mongoose";
import connectMongo from "../../../../../middleware/ConnectMongo";
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
    // const data = await mongoose.connection.db('Gcam').collection('Android versions').insertOne(data)
    // const data = await AndroidVersionModel.collection.insertOne({name : '2003'})
    await client.connect()
    const data = await client.db('Gcam').collection('Gcam').find({}).toArray();
    // console.log(mongoose.connection.db.collection)
    await client.close(true)
    res.send(data)

}
export default handler