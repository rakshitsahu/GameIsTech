import { DeveloperNamesModel } from "@/MongoDb/Gcam/Models/DeveloperNames";
import { AndroidVersionModel } from "@/MongoDb/Gcam/Models/AndroidVersion";
import { GcamVersionModel } from "@/MongoDb/Gcam/Models/GcamVersions";
import { GcamPostModel } from "@/MongoDb/Gcam/Models/GcamPost";
import { GcamModel } from "@/MongoDb/Gcam/Models/Gcam";
import { PhoneBrandsModel } from "@/MongoDb/Gcam/Models/PhoneBrands";
import { ProcessorBrandsModel } from "@/MongoDb/Gcam/Models/ProcessorBrands";
import connectDB from "../../../../middleware/ConnectDB";
import mongoose from "mongoose";
import GCAM_API_STATE from "@/Components/API/API_States";
async function handler(req , res){
    const {STATE} = req.body;
    let model;
    let data;
    switch (STATE) {
            case GCAM_API_STATE.Androidversions:
                    model = AndroidVersionModel;
                    data = await model.collection.find().toArray();
                    res.send(data);
                break;
            case GCAM_API_STATE.DeveloperNames:
                model = DeveloperNamesModel;
                data = await model.collection.find().toArray();
                console.log(data);
                res.send(data);
            break;
            case GCAM_API_STATE.Gcam:
                model = GcamModel;
                data = await model.collection.find().toArray();
                res.send(data)
            break;
            case GCAM_API_STATE.GcamPost:
                model = GcamPostModel;
                data = await model.collection.find().toArray();
                res.send(data);
            break;
            case GCAM_API_STATE.GcamVersions:
                model = GcamVersionModel;
                data = await model.collection.find().toArray();
                res.send(data);
            break;
            case GCAM_API_STATE.PhoneBrands:
                model = PhoneBrandsModel;
                data = await model.collection.find().toArray();
                console.log(data);
                res.send(data);
            break;
            case GCAM_API_STATE.ProcessorBrands:
                model = ProcessorBrandsModel;
                data = await model.collection.find().toArray();
                res.send(data);
            break;
        default:
                res.send({messaage : 'not avilable'})
            break;
    }
}
export default  connectDB(handler)