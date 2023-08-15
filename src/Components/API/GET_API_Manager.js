import axios from "axios";
import GCAM_API_STATE from '@/Components/API/API_States'
import GCAM_DB_COLLECTION from "../gcam/mongodb/DB_Name_State";
 export async function GCAM_GET_REQUEST(STATE ){
    const FindUrl = process.env.URL + '/api/gcam/mongo/find'
    const AuthenticationUrl = process.env.URL + '/api/gcam/authentication'
    switch (STATE) {
            case GCAM_API_STATE.Developers:
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

            case GCAM_API_STATE.PhoneData:
                const gcamPosts = await axios.post(FindUrl,{
                    collection : GCAM_DB_COLLECTION.Phone_Data,
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
        default:
            break;
    }
}