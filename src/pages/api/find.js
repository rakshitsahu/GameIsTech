

import connectDb from '../../../middleware/ConnectMongo';
const uri = "mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority";
async function MongoFind(req , res , client = null){
  console.log("Now came here")
  // res.send({"hello" : " success"})
  const body = req.body
    const collection = req.body.collection
    console.log(collection)
    const filter = req.body.filter
      try {
        
        const data = await client.collection(collection).find(filter).toArray();
        return data
      } catch (error) {
        console.log("Error occured "+ error)
      }

}
async function ConnectDb(req , res , client = null){
  console.log("came in api pafge")
  const result = await connectDb(req , res , MongoFind)
  console.log(result)
  res.send(result) 
}
export default ConnectDb