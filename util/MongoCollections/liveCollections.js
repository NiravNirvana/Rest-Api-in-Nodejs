////////////// Config Mongo Collection List///////////////
let mongoURL = "";//Connection String Of mongodb
let MongoClient = require('mongodb').MongoClient;
let MongoDb = {};


MongoClient.connect(mongoURL, {useNewUrlParser: true}, function (err, dbconnection) {
    if (err) throw err;
    console.log('mongoDb connected!!');
    MongoDb.Appsecret = dbconnection.db('database').collection("app_secret");// collectin to verify secret key
	
	MongoDb.collection = dbconnection.db('database').collection("collection");
	
});

module.exports = {
    MongoDb
};
