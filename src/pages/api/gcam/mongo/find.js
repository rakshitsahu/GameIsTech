
// import GCAM_DB_STATE from "@/Components/gcam/mongodb/DB_Name_State";

const { MongoClient, ServerApiVersion } = require('mongodb');
import connectMongo from '../../../../../middleware/ConnectMongo';
const uri = "mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority";
async function MongoFind(req , res){

  const body = req.body
    // console.log("type of Body is "+ typeof body)
    const collection = req.body.collection
    const filter = req.body.filter

    // console.log("collection request is "+collection)


    const client = connectMongo();
      try {
        await client.connect().then((r)=> console.log("connection Done ")) .catch( async (err) => { 
          // console.log("error occured while establishing connection ")
          // await client.close() 
        }
           )

        const data = await client.collection(collection).find(filter).toArray();
        console.log( "The result is "+ data);
        // await client.close()
        // console.log("connection has been closed");
        res.send(data)
      } catch ( error) {
        // console.log( "Error message is "+ error.message)
        // await client.close()
      }

}
export default MongoFind