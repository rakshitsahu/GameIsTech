import axios from "axios";
import GCAM_API_STATE from '@/Components/API/API_States'
import GCAM_DB_COLLECTION from "../gcam/mongodb/DB_Name_State";
 export async function InsertOperation(collection , data , filter = null){
    let url = ""
    const response = await axios.post('http://localhost:3000/api/gcam/mongo/insert' , {
        collection : collection,
        data : data,
        filter : data
        }).then(
        async (res) =>{ 
            
            return res.data
        console.log('new insert works')
        }
        )
        console.log('response is', response)
        return response
}

export async function FindAllOperation(collection , filter = null){
    let url = ""
    const response = await axios.post('http://localhost:3000/api/gcam/mongo/insert' , {
        collection : collection,
        filter : data
        }).then(
        async (res) =>{ 
        return res.data
        }
        )
        console.log('response is', response)
        return response
}