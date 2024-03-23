
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

  const {db , collection } = {...req.body}
  
  if (connections[db]) {
    const result = await callback(req , res , connections[db])
    res.send(result)
    return;
  } ;
  if(!client){
    client = new MongoClient(uri, options);
  }
  await client.connect().then(
    async ()=>{
      connections[db] = client.db(db);
      isConnected = true;
      const result = await callback(req , res , connections[db])
      res.send( result)
      
    }
  ).catch((err)=>{
    res.send( {"error":err.message})
  }) ;
      
  res.send( {"error":"Trouble Connectiong with db"})
    
  // return connections[db];
};

export default connectDb;
