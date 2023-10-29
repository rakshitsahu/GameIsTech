const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = 'mongodb+srv://admin1:admin@cluster0.eejo5yk.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection URI

let client; // Singleton client instance

async function connectToMongo() {
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

  return client.db(process.env.GCAM_DB_NAME);
}

async function closeMongoConnection() {
  if (client) {
    console.log('Closing database connection');
    await client.close();
    console.log('Database connection closed');
  }
}

window.addEventListener('beforeunload', async (event) => {
  // Check if the destination URL is within the same domain
  const destinationURL = event.target.getAttribute('href');
  const currentDomain = window.location.origin;

  if (destinationURL && destinationURL.startsWith(currentDomain)) {
    // Keep the database connection open
    console.log('Clicked on another link');
    return;
  }

  // Close the database connection
  await closeMongoConnection();
});

module.exports = { connectToMongo, closeMongoConnection };