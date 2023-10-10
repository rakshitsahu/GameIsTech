import axios from "axios";
import GCAM_API_STATE from '@/API/API_States'
import GCAM_DB_COLLECTION from "../Components/gcam/mongodb/DB_Name_State";
import { setCookie , getCookie , hasCookie } from "cookies-next";
const URL = 'https://apkhub.mobi'
// const URL = `http://localhost:${process.env.PORT}`
 export async function InsertOperation(collection , data , filter = null){
    
    const response = await axios.post( URL + '/api/gcam/mongo/insert' , {
        collection : collection,
        data : data,
        filter : filter
        }).then(
        async (res) =>{ 
            
            return res.data
        }
        )
        return response
}

export async function FindAllOperation(collection , filter = {}){
    
    const response = await axios.post(URL +'/api/gcam/mongo/find' , {
        collection : collection,
        filter : filter
        }).then(
        async (res) =>{ 
        return res.data
        }
        )

        return response
}

export async function DeleteMany(collection , filter){
    

    const response = await axios.post( URL + '/api/gcam/mongo/deletemany' , {
        collection : collection,
        filter : filter
        }).then(
        async (res) =>{ 
        return res.data
        }
        )

        return response
}

export async function UpdateOne(collection , filter , data){
    
    
    const response = await axios.post( URL + '/api/gcam/mongo/updateone' , {
        collection : collection,
        filter : filter,
        data : data
        }).then(
        async (res) =>{ 
        return res.data
        }
        )

        return response
}

export async function LogIn(userName , password ){
    const result = await axios.post('https://apkhub.mobi/api/gcam/mongo/login', 
    {
      "userName" : userName,
      "password" : password,
      "onlyAuthentication" :false
  })
  return result.data
  }
 export async function Authorization (req , res) {

    try {
        const authentication = await axios.post( URL + '/api/gcam/mongo/authorization',{
      token : getCookie('Token',{ req, res})
  })
    return authentication.data
    } catch (error) {
    }
  }