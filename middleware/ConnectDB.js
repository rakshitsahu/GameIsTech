
import mongoose from "mongoose";
import { MongoClient } from "mongodb";
import { Androidversionrun , PhoneBrandsRun , ProcessorBrandsRun } from "@/Components/gcam/useModels";
import CreatePageStateManager from "../GCAM/createPageStateManager";
import { CreatePageState } from "@/Components/gcam/EnumStates";
const connectDB = handler => async (req, res)=>{
    console.log('trying connection')
    await mongoose.connect(process.env.MONGO_URI).then(  async() => {
        console.log('connection successfull')

        // await CreatePageStateManager( parseInt(req.headers.state) , req.headers.data)
    }).catch((err) => {
        console.log(err)
    })

    return handler(req,res)
}
export default connectDB