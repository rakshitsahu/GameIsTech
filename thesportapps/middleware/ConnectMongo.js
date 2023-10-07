
import mongoose from "mongoose";
import { Androidversionrun , PhoneBrandsRun , ProcessorBrandsRun } from "@/Components/gcam/useModels";
import ResponseStatus from "../GCAM/responseStatus";
import { CreatePageState } from "@/Components/gcam/EnumStates";
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
    // Connect the client to the server	(optional starting in v4.7)
    // await mongoose.connect(uri,   {
    //   useNewUrlParser: true,
    //   useFindAndModify: false,
    //   useUnifiedTopology: true
    // }).catch((err) =>{mongoose.connection.close()});
    
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect(uri);
      // Send a ping to confirm a successful connection
      // await client.db("admin").command({ ping: 1 });
      // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close(true);
    }

}
const connectMongo = handler => async (req, res)=>{
  // if(!client.isConnected())
  // {
    
  // }
    // run();
    
    const result = handler(req , res)
    await client.close(true);
    // mongoose.connection.close()
    return result
}
export default connectMongo