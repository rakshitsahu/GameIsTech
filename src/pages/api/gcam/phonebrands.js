import { PhoneBrandsModel } from "@/MongoDb/Gcam/Models/PhoneBrands";
import connectDB from "../../../../middleware/ConnectDB";
import mongoose from "mongoose";
async function handler(req , res){
    const model = PhoneBrandsModel
    if( req.method === 'GET' )
    {
        const data = await model.collection.find().toArray();
        console.log(data)
        res.send(data)
    }
}
export default  connectDB(handler)