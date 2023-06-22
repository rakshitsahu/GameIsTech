import { ProcessorBrandsModel } from "@/MongoDb/Gcam/Models/ProcessorBrands";
import connectDB from "../../../../middleware/ConnectDB";
import mongoose from "mongoose";
async function handler(req , res){
    const model = ProcessorBrandsModel
    const data = await model.collection.find().toArray();
    console.log(data)
    res.send(data)
}
export default  connectDB(handler)