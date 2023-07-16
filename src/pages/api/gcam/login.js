import { AdminModel } from "@/MongoDb/Gcam/Models/Admin";
import connectDB from "../../../../middleware/ConnectDB";
import mongoose from "mongoose";
import { setCookie , getCookie } from "cookies-next";

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
 async function handler(req , res){
       try {
        console.log( 'body request is' , req.body);
        const saltRounds = 10
        const model = AdminModel
        const userData = await model.collection.findOne({userName:req.body.userName});
        console.log('the user data is',userData);
        const userName = userData.userName
        const password = userData.password
        const pass = "@Rakshit#20Lavi@Rakshit#20Lavi"
        const encrypted = await bcrypt.hash(pass, 10)
        console.log('copy this one', encrypted)
        const hash = await bcrypt.hash(req.body.password, 10)
        console.log( hash , userData.password )
        
        bcrypt.compare(req.body.password , userData.password, function (err , isMatch) {
            if(err)
            throw err
            if( isMatch )
            {
                const key = 'dfgdsaghgfdsghfd'
                console.log('password matches')
                const token = jwt.sign({
                    userName : userData.userName,
                    password : userData.password
                }, process.env.JWT_KEY)
                setCookie('Token', token , { req, res, maxAge: 60 * 6 * 24 });
                setCookie('Token', token);
                 res.send({status :200 , message  : 'user has been logged in' , token : token})
                 
            }
            else
            {
                console.log('password does not match')
                res.send({status :400 , message  : 'wrong username or password'})
                return;
            }
        } )
       } catch (error) {
        res.send({status :400 , message  : 'error occured'})
       }
        // console.log('response object is', response)
        // res.status(200).send({status :400 , message  : 'wrong username or password'})
        
    
}
export default connectDB(handler)

