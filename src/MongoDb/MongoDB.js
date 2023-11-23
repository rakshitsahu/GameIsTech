const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = 'mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection URI

let client; // Singleton client instance

async function connectToMongo(DbName) {
  if (!client) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    });
    await client.connect();
  }

  return client.db( DbName );
}

async function closeMongoConnection() {
  if (client) {

    await client.close();
  }
}


module.exports = { connectToMongo, closeMongoConnection };