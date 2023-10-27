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
    
    // try{
    //     if (!client.isConnected()) {
    //         console.log("called this")
    //         await client.connect().then((e) =>{
    //             console.log("database connection established "+ e);
    //         }).catch((e)=> console.log("Something went wrong "+ e)) ; 
    //       }
    //       else
    //       {
    //         console.log("already connected");
    //       }
    // }
    // catch(e){
    //     console.log("Error occured "+ e);
    // }
  return client.db(process.env.GCAM_DB_NAME);
}


module.exports = { connectToMongo };
