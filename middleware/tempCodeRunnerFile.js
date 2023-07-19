
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
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('Gcam').command({ ping: 1 });
    // const res = await client.db('Gcam').collection('Android Versions').findOne({name : "11.0"} )
    // if(!res)
    await client.db('Gcam').collection('Developer Names').insertOne({
      name :"cstark",
      gcams : []
    })
    console.log("Pinged your deployment. You successfully connected to MongoDB!" );
    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);