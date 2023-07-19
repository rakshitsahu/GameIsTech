import axios from "axios";
import GCAM_API_STATE from '@/Components/API/API_States'
import GCAM_DB_COLLECTION from "../gcam/mongodb/DB_Name_State";
 export async function GCAM_GET_REQUEST(STATE){
    switch (STATE) {
        case GCAM_API_STATE.Androidversions:
            // const androidVersions = await axios.get('http://localhost:3000/api/gcam/androidversion').then(response => {
            //     // console.log( 'the android version json is ', response.data)
            //     return response.data
            //     })
            const androidVersions = await axios.post('http://localhost:3000/api/gcam/mongo/find',{
                collection : GCAM_DB_COLLECTION.Android_Versions,
                filter : {}
            }).then(response => {
                // console.log( 'the android version json is ', response.data)
                return response.data
                })
            return androidVersions;                
            break;

            case GCAM_API_STATE.DeveloperNames:
                const developers = await axios.post('http://localhost:3000/api/gcam/mongo/find',{
                    collection : GCAM_DB_COLLECTION.Developer_Names,
                    filter : {}
                }).then(response => {
                    // console.log( 'the android version json is ', response.data)
                    return response.data
                    })
                  return developers;
            break;
            
            case GCAM_API_STATE.Gcam:
                const gcams = await axios.post('http://localhost:3000/api/gcam/mongo/find',{
                    collection : GCAM_DB_COLLECTION.Gcam,
                    filter : {}
                }).then(response => {
                    // console.log( 'the android version json is ', response.data)
                    return response.data
                    })
                    return gcams;
                
            break;

            case GCAM_API_STATE.GcamPost:
                const gcamPosts = await axios.post('http://localhost:3000/api/gcam/mongo/find',{
                    collection : GCAM_DB_COLLECTION.Gcam_Post,
                    filter : {}
                }).then(response => {
                    // console.log( 'the android version json is ', response.data)
                    return response.data
                    })
                    return gcamPosts;
            break;
            case GCAM_API_STATE.GcamVersions:
                const gcamVersions = await axios.post('http://localhost:3000/api/gcam/mongo/find',{
                    collection : GCAM_DB_COLLECTION.Gcam_Version,
                    filter : {}
                }).then(response => {
                    // console.log( 'the android version json is ', response.data)
                    return response.data
                    })
                    return gcamVersions
            break;
            case GCAM_API_STATE.PhoneBrands:
                const brands = await axios.post('http://localhost:3000/api/gcam/mongo/find',{
                    collection : GCAM_DB_COLLECTION.Phone_Brands,
                    filter : {}
                }).then(response => {
                    // console.log( 'the android version json is ', response.data)
                    return response.data
                    })
                return brands;
            break;
            case GCAM_API_STATE.ProcessorBrands:
                const processorbrands = await axios.post('http://localhost:3000/api/gcam/mongo/find',{
                    collection : GCAM_DB_COLLECTION.Processor_Brands,
                    filter : {}
                }).then(response => {
                    // console.log( 'the android version json is ', response.data)
                    return response.data
                    })
                    return processorbrands;
                    
            break;
            case GCAM_API_STATE.Generic:
                const genericGcams = await axios.post('http://localhost:3000/api/gcam/mongo/find',{
                    collection : GCAM_DB_COLLECTION.Gcam_Generic,
                    filter : {isGeneric : true}
                }).then(response => {
                    // console.log( 'the android version json is ', response.data)
                    return response.data
                    })
                    return genericGcams;
            break;
            case GCAM_API_STATE.Authentication:
                const authenticated = await axios.get('http://localhost:3000/api/gcam/authentication').then(response => {
                    // console.log( 'the processor json is ', response.data)
                    return response.data
                    })
                    return authenticated;
            break;
            
            
    
    
        default:
            break;
    }
}