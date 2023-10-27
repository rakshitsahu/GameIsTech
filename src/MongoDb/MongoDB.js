// mongodb.js


const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority";// Replace with your MongoDB connection URI
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  });

async function connectToMongo() {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db(process.env.GCAM_DB_NAME);
}


module.exports = { connectToMongo };
