
const { MongoClient, Db } = require('mongodb');

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let connections = {};
let isConnected = false
// callback must have 3 perimeters - req , res , MongoClient
const connectDb = async (req , res , callback) => {
  console.log("coame inside connect db")
  const {db , collection } = {...req.body}
  console.log(db , collection)
  
  // if (connections[db]) {
  //   res.send(callback(req , res , connections[db]))
  // } ;

  if(!client)
  {
    client = new MongoClient(uri, options);
  }
  if (!isConnected) await client.connect().then(
    async ()=>{
      connections[db] = client.db(db);
      isConnected = true;
      const result = await callback(req , res , connections[db])
      res.send( result)
    }
  );
      
  res.send( {"error":"Something went wrong"})
    
  // return connections[db];
};

export default connectDb;
