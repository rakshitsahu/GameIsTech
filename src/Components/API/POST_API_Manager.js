import axios from "axios";
import GCAM_API_STATE from '@/Components/API/API_States'
import GCAM_DB_COLLECTION from "../gcam/mongodb/DB_Name_State";
 export async function InsertOperation(collection , data , filter = null){
    let url = ""
    console.log('the data found at response time is', data , collection)
    const response = await axios.post('http://localhost:3000/api/gcam/mongo/insert' , {
        collection : collection,
        data : data,
        filter : filter
        }).then(
        async (res) =>{ 
            
            return res.data
        console.log('new insert works')
        }
        )
        console.log('response is', response)
        return response
}

export async function FindAllOperation(collection , filter = {}){
    let url = ""
    const response = await axios.post('http://localhost:3000/api/gcam/mongo/find' , {
        collection : collection,
        filter : filter
        }).then(
        async (res) =>{ 
        return res.data
        }
        )
        console.log('response is', response)
        return response
}

export async function DeleteMany(collection , filter){
    let url = ""
    console.log('the collectiona nd filter is', collection , filter)
    const response = await axios.post('http://localhost:3000/api/gcam/mongo/deletemany' , {
        collection : collection,
        filter : filter
        }).then(
        async (res) =>{ 
        return res.data
        }
        )
        console.log('response is', response)
        return response
}

export async function UpdateOne(collection , filter , data){
    let url = ""
    console.log('the data is', data)
    
    const response = await axios.post('http://localhost:3000/api/gcam/mongo/updateone' , {
        collection : collection,
        filter : filter,
        data : data
        }).then(
        async (res) =>{ 
        return res.data
        }
        )
        console.log('response is', response)
        return response
}