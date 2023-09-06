
// import GCAM_DB_STATE from "@/Components/gcam/mongodb/DB_Name_State";

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority";
async function MongoFind(req , res){
  console.log( 'the req body is', req.body);
  console.log('the type of req body is', typeof req.body);
  const body = req.body
  console.log('the request body is', body)

    const collection = req.body.collection
    const filter = req.body.filter
    console.log(' collection is', collection)
    console.log('filter is', filter)


    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
      try {
        await client.connect().catch( async (err) => { 
          console.log('the error occurred is', err)
          await client.close() 
        }
           )
        console.log('request has been fetched successfully')
        const data = await client.db(process.env.GCAM_DB_NAME).collection(collection).find(filter).toArray();
        await client.close()
        res.send(data)
      } catch (error) {
        console.log('error fetching data' , error)

        await client.close()
      }

}
export default MongoFind