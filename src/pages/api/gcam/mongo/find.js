
// import GCAM_DB_STATE from "@/Components/gcam/mongodb/DB_Name_State";
import { connectToMongo } from "@/MongoDb/MongoDb";

const uri = "mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority";
async function MongoFind(req , res){
  const body = req.body

    const collection = req.body.collection
    const filter = req.body.filter

    const client =await connectToMongo();
      try {
        const data = await client.collection(collection).find(filter).toArray();
        res.send(data)
      } catch ( error) {

      }

}
export default MongoFind