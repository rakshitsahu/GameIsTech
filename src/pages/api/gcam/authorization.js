const jwt =  require('jsonwebtoken')
export async function handler(req , res){
    const token = req.body.token
    console.log('the token found in authorization is', token)
    jwt.verify(token , process.env.JWT_KEY , (err, verifiedJwt) => {
        if(err){
          console.log('unauthenticated user')
          res.send({status :400 , message : 'unauthenticated user'})
        }else{
            res.send({status : 200 , message : 'Authenticated user'})
        }
      })

}
// export default Authorization(handler)?
export default handler

