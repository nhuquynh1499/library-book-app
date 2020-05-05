const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://" + process.ENV.mongodb_username + ":" + process.ENV.mongodb_password + "@learnexpresscodersx-kuqyf.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

module.exports = client
