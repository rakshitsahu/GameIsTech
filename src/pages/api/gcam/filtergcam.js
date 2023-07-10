import mongoose from "mongoose";
import connectDB from "../../../../middleware/ConnectDB";
import { GcamModel } from "@/MongoDb/Gcam/Models/Gcam";
import ResponseStatus from "../../../../GCAM/responseStatus";
export async function handler(req , res){
    const model = GcamModel
    const data = await model.collection.find(req.body).toArray();
    res.send(data)
}

export default connectDB(handler)