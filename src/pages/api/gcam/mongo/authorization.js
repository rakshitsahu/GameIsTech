// const jwt =  require('jsonwebtoken')
export async function handler(req , res){
  
  console.log('try block before request')
  try {
    
    // res.status(200).json({status : 200 , message : 'Authenticated user'})
    console.log('try block after request')
    const token = req.body.token
    jwt.verify(token , "Ndfghfdsghgjghfdsfgh" , (err, verifiedJwt) => {
        if(err){
          console.log('unauthenticated user')
          res.send({status :400 , message : 'unauthenticated user'})
        }else{
            res.send({status : 200 , message : 'Authenticated user'})
        }
      })
  } catch (error) {
    console.log( 'error occured in authorization api', error)
    res.status(404).json({status : 200 , message : 'Authenticated user'})
    console.log('catch block after error')
    // res.send({status : 200 , message : 'Authenticated user'})
  }


}
// export default Authorization(handler)?
export default handler

