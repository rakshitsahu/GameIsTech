import mongoose from "mongoose";
import connectDB from "../../../../middleware/ConnectDB";
import { GcamModel } from "@/MongoDb/Gcam/Models/Gcam";
import ResponseStatus from "../../../../GCAM/responseStatus";
export async function handler(req , res){
    // console.log('handler has been callled')
    // await GcamCheck(req.headers.data).then(
    //     (result)=>{
    //         res.status(200).json({status : "inserted"})
    //     }
    // )
    const data = req.body
    
    const model = GcamModel
    // console.log('gcam data is ',data)
    await model.collection.findOne({downloadLink : data.downloadLink} , async (error , result) =>{
        if(error)
        res.status(ResponseStatus.Error_Ocurred).json({ message : "Error occured while finding the Gcam by download link" })
        if(result)
        return result.downloadLink
        console.log('working ill here')
        await model.collection.insertOne(data ,(error , result) =>{
            if(error)
             res.status(400).json({message : 'error occured'});
             else if(!result)
             res.status(400).json({message : 'error occured'});
            else
            res.status(200).json({downloadLink : data.downloadLink});

        }) ;
    } )
}

export default connectDB(handler)