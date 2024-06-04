

import connectDb from '../../../middleware/ConnectMongo';
const uri = "mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority";
async function MongoFind(req , res , client = null){

  // res.send({"hello" : " success"})
  const body = req.body
    const collection = req.body.collection

    const filter = req.body.filter
    const projection = req.body.projection ? req.body.projection : {}
      try {
        
        const data = await client.collection(collection).findOne(filter ,{projection});
        return data
      } catch (error) {

        res.send({"error":error.message})
      }

}
async function ConnectDb(req , res , client = null){

  const result = await connectDb(req , res , MongoFind)

  res.send(result) 
}
export default ConnectDb