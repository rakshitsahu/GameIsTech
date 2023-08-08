import axios from "axios";
import GCAM_API_STATE from '@/Components/API/API_States'
import GCAM_DB_COLLECTION from "../gcam/mongodb/DB_Name_State";
import { setCookie , getCookie , hasCookie } from "cookies-next";
let URL = process.env.URL
 export async function InsertOperation(collection , data , filter = null){
    
    console.log('the data found at response time is', data , collection)
    const response = await axios.post( URL + '/api/gcam/mongo/insert' , {
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
    const response = await axios.post(URL +'/api/gcam/mongo/find' , {
        collection : collection,
        filter : filter
        }).then(
        async (res) =>{ 
        return res.data
        }
        )
        console.log('response is of find all operation is', response)
        return response
}

export async function DeleteMany(collection , filter){
    let url = ""
    console.log('the collectiona nd filter is', collection , filter)
    const response = await axios.post( URL + '/api/gcam/mongo/deletemany' , {
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
    
    const response = await axios.post( URL + '/api/gcam/mongo/updateone' , {
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

export async function LogIn(userName , password ){
    const result = await axios.post('https://gameistech.com/api/gcam/mongo/login', 
    {
      "userName" : userName,
      "password" : password,
      "onlyAuthentication" :false
  })
  return result.data
  }
 export async function Authorization (req , res) {
    // Fetch data from external API
    console.log('the token is ',getCookie('Token',{ req, res}))
    try {
        const authentication = await axios.post( URL + '/api/gcam/mongo/authorization',{
      token : getCookie('Token',{ req, res})
  })
  console.log('works fine till here' , authentication)
    return authentication.data
    } catch (error) {
        console.log('error occured in post api manager',error)
    }
  }