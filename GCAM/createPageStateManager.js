import { Androidversionrun , PhoneBrandsRun , ProcessorBrandsRun , DeveloperNamesRun } from "../src/Components/gcam/useModels";
import { CreatePageState } from "../src/Components/gcam/EnumStates";
export default async function  CreatePageStateManager( State , data ) {
    data = JSON.parse(data)
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
        default:
            break;
    }
}