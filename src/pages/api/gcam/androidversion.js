import { AndroidVersionModel } from "@/MongoDb/Gcam/Models/AndroidVersion";
import connectDB from "../../../../middleware/ConnectDB";
import mongoose from "mongoose";
 async function handler(req , res){
    const model = AndroidVersionModel
    const data = await model.collection.find().toArray();
    res.send(data)
}
export default  connectDB(handler)

