
// import GCAM_DB_STATE from "@/Components/gcam/mongodb/DB_Name_State";
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority";
export async function handler(req , res){
  console.log( 'the req body is', req.body);
  console.log('the type of req body is', typeof req.body);
  const body = req.body
  console.log('the request body is', body)

    const collection = "gcamVersionsCount"
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
        const data = await client.db('Webscrap-GCAM').collection(collection).find({}).toArray();
        await client.close()
        res.send(data)
      } catch (error) {
        console.log('error fetching data' , error)

        await client.close()
      }

}
export default handler