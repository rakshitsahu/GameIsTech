
// import GCAM_DB_STATE from "@/Components/gcam/mongodb/DB_Name_State";

const { MongoClient, ServerApiVersion } = require('mongodb');
import { connectToMongo } from '@/MongoDb/MongoDB';
const uri = "mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority";
async function MongoFind(req , res){

  const body = req.body
    // console.log("type of Body is "+ typeof body)
    const collection = req.body.collection
    const filter = req.body.filter
    const client =await connectToMongo();
      try {
        const data = await client.collection(collection).find(filter).toArray();
        // await client.close()
        console.log("response found is "+data);
        res.send(data)
      } catch ( error) {
        // console.log( "Error message is "+ error.message)
        // await client.close()
      }

}
export default MongoFind