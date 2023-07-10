import { GcamPostModel } from "@/MongoDb/Gcam/Models/GcamPost";
import connectDB from "../../../../middleware/ConnectDB";
import mongoose from "mongoose";
 async function handler(req , res){
    const model = GcamPostModel
    const data = await model.collection.find().toArray();
    res.send(data)
}
export default  connectDB(handler)

