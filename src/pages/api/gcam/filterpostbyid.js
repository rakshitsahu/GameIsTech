import mongoose from "mongoose";
import connectDB from "../../../../middleware/ConnectDB";
import { GcamPostModel } from "@/MongoDb/Gcam/Models/GcamPost";
import ResponseStatus from "../../../../GCAM/responseStatus";
import { ObjectId } from "mongodb";
export async function handler(req , res){
    const model = GcamPostModel
    console.log('data of body is', req.body)
    // const objectIds =req.body.objectIds
    // const documentIds = objectIds.map(function(myId) { return new ObjectId(myId); })

    // console.log('the jason data is', documentIds)
    const data = await model.collection.find(req.body).toArray();
    res.send(data)
}

export default connectDB(handler)