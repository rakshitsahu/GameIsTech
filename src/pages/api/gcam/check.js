const mongoose =  require('mongoose')
import connectDB from '../../../../middleware/ConnectDB'
import CreatePageStateManager from '../../../../GCAM/createPageStateManager'
import AndroidVersionModel from '@/MongoDb/Gcam/Models/AndroidVersion'
export async function handler (req , res) {
    //const Result = new AndroidVersionModel({version : "8.0"})
    //Result.save()
    //console.log( req )
    console.log(req.headers.data)
    await CreatePageStateManager( parseInt(req.headers.state) , req.headers.data)
    // console.log('data found is ' , req.headers.data )
    res.status(200).json({status : "connected"})
}
export default connectDB(handler)
