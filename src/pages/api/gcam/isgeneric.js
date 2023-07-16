import { GcamModel } from "@/MongoDb/Gcam/Models/Gcam";
import connectDB from "../../../../middleware/ConnectDB";
import mongoose from "mongoose";
 async function handler(req , res){
    const model = GcamModel
    const data = await model.collection.find({isGeneric:true}).toArray();
    res.send(data)
}
export default  connectDB(handler)

