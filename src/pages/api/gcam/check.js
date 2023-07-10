const mongoose =  require('mongoose')
import connectDB from '../../../../middleware/ConnectDB'
import { Androidversionrun , PhoneBrandsRun , ProcessorBrandsRun , DeveloperNamesRun } from '@/Components/gcam/useModels';
import { CreatePageState } from '@/Components/gcam/EnumStates';
// import CreatePageStateManager from '../../../../GCAM/createPageStateManager'
import AndroidVersionModel from '@/MongoDb/Gcam/Models/AndroidVersion'
import { AddGcamVersion } from '@/Components/gcam/useModels';
export async function handler (req , res) {


    const State = req.body.state
    const data = req.body.data
    // console.log('data found in manager is ' , typeof data)
    switch (State) {
        case CreatePageState.Androidversion:
            console.log('android version called' , data)
            await Androidversionrun(data)
            break;
        case CreatePageState.PhoneBrands:
            console.log('phone brands called' , data)
            await PhoneBrandsRun(data)
            break;
        case CreatePageState.ProcessorBrands:
            console.log('processor brands called' , data)
            await ProcessorBrandsRun(data)
            break;
        case CreatePageState.DeveloperNames:
            console.log('Developer Names called' , data)
            await DeveloperNamesRun(data)
            break;
        case CreatePageState.GcamVersion:
            console.log('Developer Names called' , data)
            await AddGcamVersion(data)
            break;
        default:
            break;
    }
    // await CreatePageStateManager( parseInt(req.headers.state) , req.headers.data)
    // console.log('data found is ' , req.headers.data )
    res.status(200).json({status : "connected"})
}
export default connectDB(handler)
