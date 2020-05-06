const mongoose = require('mongoose');

const URL = "mongodb+srv://" + process.env.mongodb_username + ":" + process.env.mongodb_password +"@cluster0-kuqyf.mongodb.net/library?retryWrites=true&w=majority"

const connect = async () => {
  await mongoose.connect(URL,
    {
      useNewUrlParser: true 
    }
  )
}


module.exports = connect;