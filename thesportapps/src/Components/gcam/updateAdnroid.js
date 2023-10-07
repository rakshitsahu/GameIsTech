var MongoClient = require('mongodb').MongoClient;
export default function addInfo(err, db) {
    if (err) throw err;
    var dbo = db.db("gcam");
    db.collection("Android versions").insertOne({version : "8.0"})
}