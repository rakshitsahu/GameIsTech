
// import GCAM_DB_STATE from "@/Components/gcam/mongodb/DB_Name_State";
const { MongoClient, ServerApiVersion } = require('mongodb');
import axios from 'axios';
import MongoFind from './gcam/mongo/find';
const uri = "mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority";
export async function handler(req , res){
  // console.log( 'the req body is', req.body);
  // console.log('the type of req body is', typeof req.body);
  const body = req.body
  // console.log('the request body is', body)

    const collection = "indexedPaths"
    const filter = req.body.filter
    // console.log(' collection is', collection)
    // console.log('filter is', filter)


    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
      try {
        await client.connect()
        await axios.post('https://apkhub.mobi/api/indexing', {
          collection : "GameIsTech",
          domainName : "apkhub.mobi"
        });

        // await axios.post('https://apkhub.mobi/api/indexing', {
        //   collection : "AndroidApkDownloads",
        //   domainName : "androidapkdownloads.info"
        // });
        // await axios.post('https://apkhub.mobi/api/indexing', {
        //   collection : "ApkHub",
        //   domainName : "apkhub.mobi"
        // });
        res.send({message : "success"})
      } catch (error) {
        // console.log('error fetching data' , error)
        res.send({message : "error" , er : error})
        await client.close()
      }

}
export default handler