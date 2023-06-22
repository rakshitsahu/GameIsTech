import { DeveloperNamesModel } from "@/MongoDb/Gcam/Models/DeveloperNames";
import connectDB from "../../../../middleware/ConnectDB";
import mongoose from "mongoose";
async function handler(req , res){
    const model = DeveloperNamesModel
    const data = await model.collection.find().toArray();
    console.log(data)
    res.send(data)
}
export default  connectDB(handler)