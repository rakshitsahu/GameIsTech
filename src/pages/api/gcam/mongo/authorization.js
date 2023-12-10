
export async function handler(req , res){
  
  
  try {
    
    
    
    const token = req.body.token
    jwt.verify(token , "Ndfghfdsghgjghfdsfgh" , (err, verifiedJwt) => {
        if(err){
          
          res.send({status :400 , message : 'unauthenticated user'})
        }else{
            res.send({status : 200 , message : 'Authenticated user'})
        }
      })
  } catch (error) {
    
    res.status(404).json({status : 200 , message : 'Authenticated user'})
    
    
  }


}

export default handler

