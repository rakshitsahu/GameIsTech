import axios from "axios";
import GCAM_API_STATE from '@/Components/API/API_States'
 export async function GCAM_GET_REQUEST(STATE){
    switch (STATE) {
        case GCAM_API_STATE.Androidversions:
            const androidVersions = await axios.get('http://localhost:3000/api/gcam/androidversion').then(response => {
                // console.log( 'the android version json is ', response.data)
                return response.data
                })
            return androidVersions;                
            break;

            case GCAM_API_STATE.DeveloperNames:
                const developers = await axios.get('http://localhost:3000/api/gcam/developernames').then(response => {
                    // console.log(response.data)
                    return response.data
                  })
                  return developers;
            break;
            
            case GCAM_API_STATE.Gcam:
                const gcams = await axios.get('http://localhost:3000/api/gcam/gcam').then(response => {
                    // console.log( 'the gcam Posts json is ', response.data)
                    return response.data
                    })
                    return gcams;
                
            break;

            case GCAM_API_STATE.GcamPost:
                const gcamPosts = await axios.get('http://localhost:3000/api/gcam/getgcamposts').then(response => {
                    // console.log( 'the gcam Posts json is ', response.data)
                    return response.data
                    })
                    return gcamPosts;
            break;
            case GCAM_API_STATE.GcamVersions:
                const gcamVersions = await axios.get('http://localhost:3000/api/gcam/gcamversion').then(response => {
                    // console.log( 'the gcam versions json is ', response.data)
                    return response.data
                    })
                    return gcamVersions
            break;
            case GCAM_API_STATE.PhoneBrands:
                const brands = await axios.get('http://localhost:3000/api/gcam/phonebrands').then(response => {
                    // console.log(response.data)
                    return response.data
                  })
                return brands;
            break;
            case GCAM_API_STATE.ProcessorBrands:
                const processorbrands = await axios.get('http://localhost:3000/api/gcam/processorbrands').then(response => {
                    // console.log( 'the processor json is ', response.data)
                    return response.data
                    })
                    return processorbrands;
                    
            break;
            case GCAM_API_STATE.Generic:
                const genericGcams = await axios.get('http://localhost:3000/api/gcam/isgeneric').then(response => {
                    // console.log( 'the processor json is ', response.data)
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