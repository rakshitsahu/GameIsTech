
// import GCAM_DB_STATE from "@/Components/gcam/mongodb/DB_Name_State";

const { MongoClient, ServerApiVersion } = require('mongodb');
import { connectToMongo } from '@/MongoDb/MongoDB';
const uri = "mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority";
async function MongoFind(req , res){
  // console.log( 'the req body is', req.body);
  // console.log('the type of req body is', typeof req.body);
  const body = req.body
  // console.log('the request body is', body)

    const collection = req.body.collection
    const filter = req.body.filter
    const client =await connectToMongo();
      try {
        const data = await client.collection(collection).find(filter).toArray();
        // await client.close()
        res.send(data)
      } catch ( error) {

      }

}
export default MongoFind