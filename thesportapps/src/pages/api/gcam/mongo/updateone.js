
// import GCAM_DB_STATE from "@/Components/gcam/mongodb/DB_Name_State";

import connectMongo from "../../../../../middleware/ConnectMongo";
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority";
export async function handler(req , res){
    const collection = req.body.collection
    const filter = req.body.filter
    const Data = req.body.data
    console.log(collection , filter , Data)
    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
        await client.connect()
        // console.log('the collection and filter is', collection , filter , Data)
        const db =  client.db('Indexing-DB').collection(collection)
        const data = await db.updateOne( filter , Data , (updateErr, result) => {
          console.log(updateErr)
          if (updateErr) {
            console.error('Error updating document:', updateErr);
            res.send({ message: "failed" });
          } else {
            console.log('Document updated successfully');
            res.send({ message: "success", result });
          }
        });
        console.log(data)
        res.send(data)
        await client.close(true)


}
export default handler