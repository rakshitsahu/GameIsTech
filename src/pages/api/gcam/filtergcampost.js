import mongoose from "mongoose";
import connectDB from "../../../../middleware/ConnectDB";
import { GcamPostModel } from "@/MongoDb/Gcam/Models/GcamPost";
import ResponseStatus from "../../../../GCAM/responseStatus";
export async function handler(req , res){
    const model = GcamPostModel
    const data = await model.collection.find(req.body).toArray();
    res.send(data)
}

export default connectDB(handler)