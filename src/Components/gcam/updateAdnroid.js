var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


export default function addInfo(err, db) {
    if (err) throw err;
    var dbo = db.db("gcam");
    db.collection("Android versions").insertOne({version : "8.0"})
}