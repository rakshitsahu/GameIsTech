

import axios from "axios";
import { getCookie , hasCookie } from "cookies-next";
const bcrypt = require('bcrypt')

export default async function handler (req, res){
    if(!hasCookie('Token',{ req, res, maxAge: 60 * 6 * 24 }))
    {
        res.send({status : 400 , message : "Token not found"})
        console.log('the token is',hasCookie('Token',{ req, res, maxAge: 60 * 6 * 24 }))
    }
    else
    {
        console.log('posting coocie is',getCookie('Token',{ req, res, maxAge: 60 * 6 * 24 }))
        await axios.post('http://localhost:3000/api/gcam/authorization',{
            token : getCookie('Token',{ req, res, maxAge: 60 * 6 * 24 })
        }).then( (result) =>{
            // console.log( 'the reesult is', result)
            if(result.data.status === 200)
            res.send({status : 200 , message : "User is authenticated"})
            else
            res.send({status : 400 , message : "User is not authorized"})
        }).catch( (err) =>{res.send({status : 400 , message : "error occured"})} )
    }
}