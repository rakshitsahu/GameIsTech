import { GcamVersionModel } from "@/MongoDb/Gcam/Models/GcamVersions";
import connectDB from "../../../../middleware/ConnectDB";
import mongoose from "mongoose";
 async function handler(req , res){
    const model = GcamVersionModel
    const data = await model.collection.find().toArray();
    res.send(data)
}
export default  connectDB(handler)

