
// import GCAM_DB_STATE from "@/Components/gcam/mongodb/DB_Name_State";

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority";
async function MongoFind(req , res){

  const body = req.body

    const collection = req.body.collection
    const filter = req.body.filter




    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
      try {
        await client.connect().catch( async (err) => { 

          await client.close() 
        }
           )

        const data = await client.db(process.env.GCAM_DB_NAME).collection(collection).find(filter).toArray();
        await client.close()
        res.send(data)
      } catch (error) {


        await client.close()
      }

}
export default MongoFind