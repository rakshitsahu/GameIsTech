
// import GCAM_DB_STATE from "@/Components/gcam/mongodb/DB_Name_State";
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
        console.log("request for collection '" + collection );
        const data = await client.collection(collection).find(filter).toArray();
        console.log("result for collection "+ collection+" is"+ data);
        // await client.close()
        res.send(data)
      } catch ( error) {

      }

}
export default MongoFind