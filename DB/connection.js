const mongoose = require('mongoose');

const URL = "mongodb+srv://" + process.env.mongodb_username + ":" + process.env.mongodb_password + "@learnexpresscodersx-kuqyf.gcp.mongodb.net/test?retryWrites=true&w=majority"

const connect = async () => {
  await mongoose.connect(URL,
    { 
      useUnifiedTopology: true,
      useNewUrlParser: true 
    }
  )
}

module.exports = connect;