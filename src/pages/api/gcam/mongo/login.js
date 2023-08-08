
import { setCookie , getCookie } from "cookies-next";
import GCAM_DB_STATE from "@/Components/gcam/mongodb/DB_Name_State";
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

 async function handler(req , res){
    const uri = "mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
       try {
        // console.log( 'body request is' , req.body);
        const saltRounds = 10

          await client.connect().catch( async (err) => { await client.close(true) } )
        const userData = await client.db('Gcam').collection(GCAM_DB_STATE.Admin).findOne({userName:req.body.userName});
        await client.close(true)
        // console.log('the user data is',userData);
        const userName = userData.userName
        const password = userData.password
        const pass = "@Rakshit#20Lavi@Rakshit#20Lavi"
        const encrypted = await bcrypt.hash(pass, 10)
        // console.log('copy this one', encrypted)
        const hash = await bcrypt.hash(req.body.password, 10)
        // console.log( hash , userData.password )
        
        bcrypt.compare(req.body.password , userData.password, function (err , isMatch) {
            if(err)
            throw err
            if( isMatch )
            {
                const key = 'dfgdsaghgfdsghfd'
                // console.log('password matches')
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
                // console.log('password does not match')
                res.send({status :400 , message  : 'wrong username or password'})
                return;
            }
        } )
       } catch (error) {
        await client.close(true)
        res.send({status :400 , message  : 'error occured'})
       }
        // console.log('response object is', response)
        // res.status(200).send({status :400 , message  : 'wrong username or password'})
        
    
}
export default handler

