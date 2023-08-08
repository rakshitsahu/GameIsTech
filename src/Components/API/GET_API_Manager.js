import axios from "axios";
import GCAM_API_STATE from '@/Components/API/API_States'
import GCAM_DB_COLLECTION from "../gcam/mongodb/DB_Name_State";
 export async function GCAM_GET_REQUEST(STATE ){
    const FindUrl = process.env.URL + '/api/gcam/mongo/find'
    const AuthenticationUrl = process.env.URL + '/api/gcam/authentication'
    switch (STATE) {
        case GCAM_API_STATE.Androidversions:

            const androidVersions = await axios.post(FindUrl ,{
                collection : GCAM_DB_COLLECTION.Android_Versions,
                filter : {}
            }).then(response => {
                // console.log( 'the android version json is ', response.data)
                return response.data
                })
            return androidVersions;                
            break;

            case GCAM_API_STATE.DeveloperNames:
                const developers = await axios.post(FindUrl,{
                    collection : GCAM_DB_COLLECTION.Developer_Names,
                    filter : {}
                }).then(response => {
                    // console.log( 'the android version json is ', response.data)
                    return response.data
                    })
                  return developers;
            break;
            
            case GCAM_API_STATE.Gcam:
                const gcams = await axios.post(FindUrl,{
                    collection : GCAM_DB_COLLECTION.Gcam,
                    filter : {}
                }).then(response => {
                    // console.log( 'the android version json is ', response.data)
                    return response.data
                    })
                    return gcams;
                
            break;

            case GCAM_API_STATE.GcamPost:
                const gcamPosts = await axios.post(FindUrl,{
                    collection : GCAM_DB_COLLECTION.Gcam_Post,
                    filter : {}
                }).then(response => {
                    // console.log( 'the android version json is ', response.data)
                    return response.data
                    })
                    return gcamPosts;
            break;
            case GCAM_API_STATE.GcamVersions:
                const gcamVersions = await axios.post(FindUrl,{
                    collection : GCAM_DB_COLLECTION.Gcam_Version,
                    filter : {}
                }).then(response => {
                    // console.log( 'the android version json is ', response.data)
                    return response.data
                    })
                    return gcamVersions
            break;
            case GCAM_API_STATE.PhoneBrands:
                console.log('Phone Brands is called')
                console.log('db collection brands is')
                const brands = await axios.post(FindUrl,{
                    collection : GCAM_DB_COLLECTION.Phone_Brands,
                    filter : {}
                }).then(response => {
                    // console.log( 'the android version json is ', response.data)
                    return response.data
                    })
                return brands;
            break;
            case GCAM_API_STATE.ProcessorBrands:
                const processorbrands = await axios.post(FindUrl,{
                    collection : GCAM_DB_COLLECTION.Processor_Brands,
                    filter : {}
                }).then(response => {
                    // console.log( 'the android version json is ', response.data)
                    return response.data
                    })
                    return processorbrands;
                    
            break;
            case GCAM_API_STATE.Generic:
                const genericGcams = await axios.post(FindUrl,{
                    collection : GCAM_DB_COLLECTION.Gcam_Generic,
                    filter : {isGeneric : true}
                }).then(response => {
                    // console.log( 'the android version json is ', response.data)
                    return response.data
                    })
                    return genericGcams;
            break;
            case GCAM_API_STATE.Authentication:
                const authenticated = await axios.get(AuthenticationUrl).then(response => {
                    // console.log( 'the processor json is ', response.data)
                    return response.data
                    })
                    return authenticated;
            break;
            case GCAM_API_STATE.Test:
                const json = JSON.stringify({
                    collection : GCAM_DB_COLLECTION.Phone_Brands , 
                    filter : {}
                })
                const res = await fetch(FindUrl + 'a', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: json,
                    });
                    const data = await res.json()
                  return data

            break;
            
            
    
    
        default:
            break;
    }
}