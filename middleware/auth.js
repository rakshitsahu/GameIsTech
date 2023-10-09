
import mongoose from "mongoose";
import { MongoClient } from "mongodb";
import { AdminModel } from "@/MongoDb/Gcam/Models/Admin";
import ResponseStatus from "../GCAM/responseStatus";
import { CreatePageState } from "@/Components/gcam/EnumStates";
import connectDB from "./ConnectDB";
import axios from "axios";
import { setCookie , getCookie , hasCookie } from "cookies-next";
const bcrypt = require('bcrypt')

const Authorization = handler => async (req, res)=>{
    if(!hasCookie('Token',{ req, res, maxAge: 60 * 6 * 24 }))
    {
        res.send({status : 400 , message : "Token not found"})

    }
    else
    {

        await axios.post( process.env.URL + '/api/gcam/authorization',{
            token : getCookie('Token',{ req, res, maxAge: 60 * 6 * 24 })
        }).then( (result) =>{
            if(result.data.status === 200)
            return handler(req , res)
            else
            res.send({status : 400 , message : "User is not authorized"})
        }).catch( (err) =>{res.send({status : 400 , message : "error occured"})} )
    }
}
export default Authorization