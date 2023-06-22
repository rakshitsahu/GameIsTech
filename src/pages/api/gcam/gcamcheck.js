import mongoose from "mongoose";
import connectDB from "../../../../middleware/ConnectDB";
import { GcamModel } from "@/MongoDb/Gcam/Models/Gcam";
import { GcamCheck } from "@/Components/gcam/useModels";
export async function handler(req , res){
    console.log('handler has been callled')
    await GcamCheck(req.headers.data).then(
        (result)=>{
            res.status(200).json({status : "inserted"})
        }
    )
}
export default connectDB(handler)