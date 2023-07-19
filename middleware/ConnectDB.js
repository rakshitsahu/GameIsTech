
import mongoose from "mongoose";
import { Androidversionrun , PhoneBrandsRun , ProcessorBrandsRun } from "@/Components/gcam/useModels";
import ResponseStatus from "../GCAM/responseStatus";
import { CreatePageState } from "@/Components/gcam/EnumStates";
// const connectDB = handler => async (req, res)=>{
//     console.log('trying connection')
//     await mongoose.connect(process.env.MONGO_URI).then(  async() => {
//         console.log('connection successfull')

//         // await CreatePageStateManager( parseInt(req.headers.state) , req.headers.data)
//     }).catch( ()=> res.status(ResponseStatus.Error_Ocurred).json({ message : "Error occured while connecting to database" }) )
//     await mongoose.connection.close()
//     return handler(req,res)
// }

const connectDB = handler => async (req, res)=>{
    console.log('trying connection')
    await mongoose.connect(process.env.MONGO_URI).then(  async() => {
        console.log('connection successfull')

        // await CreatePageStateManager( parseInt(req.headers.state) , req.headers.data)
    }).catch( ()=> res.status(ResponseStatus.Error_Ocurred).json({ message : "Error occured while connecting to database" }) )

    return handler(req,res)
}
export default connectDB