import GCAM_API_STATE from '@/API/API_States';
import axios from "axios";
import GCAM_DB_COLLECTION from "../Components/gcam/mongodb/DB_Name_State";
 export async function GCAM_GET_REQUEST(STATE ){
    // const hostName = process.env.NODE_ENV === 'production' ?  'https://apkhub.mobi' :'http://localhost:3000'
    // const hostName = 'http://apkhub.mobi'
    const hostName = `http://localhost:${process.env.PORT}`
    const FindUrl = hostName + '/api/gcam/mongo/find'
    const AuthenticationUrl = hostName + '/api/gcam/authentication'
    switch (STATE) {
            case GCAM_API_STATE.Developers:
                const developers = await axios.post(FindUrl,{
                    collection : GCAM_DB_COLLECTION.Developer_Names,
                    filter : {}
                }).then(response => {
                    console.log( 'the android version json is ', response.data)
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

            case GCAM_API_STATE.GcamVersionData:
                const gcamData = await GCAM_GET_REQUEST(GCAM_API_STATE.Gcam)
                // console.log(gcamData)
                const versionMap = new Map()
                const GenericGcams = await GCAM_GET_REQUEST(GCAM_API_STATE.Generic)
                // console.log(GenericGcams)
                GenericGcams.forEach(
                    (gcamList) =>{
                        gcamList.data.forEach(
                            (gcam) =>{
                                if(versionMap.get(gcam.version)){
                                    versionMap.get(gcam.version).push(gcam);
                                }
                                else
                                versionMap.set(gcam.version,[gcam]);
                            }
                        )
                    }
                )
                // console.log(versionMap)

                gcamData.forEach(
                    (gcamJson)=>{
                        // console.log(gcamJson)
                        gcamJson.data.forEach(
                            (gcam)=>{
                                // console.log(gcam)
                                gcam.developer = gcamJson.developerName
                                if(versionMap.get(gcam.version)){
                                    versionMap.get(gcam.version).push(gcam);
                                }
                                else
                                versionMap.set(gcam.version,[gcam]);
                                
                            }
                        )
                    }
                )
                // console.log(versionMap)
                return versionMap
            break;

            case GCAM_API_STATE.Generic:
                const genericGcams = await axios.post(FindUrl,{
                    collection : GCAM_DB_COLLECTION.Gcam_Generic,
                    filter : {}
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