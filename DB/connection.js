const mongoose = require('mongoose');

const URL = "mongodb+srv://ngngocnhuquynh0104:CodersX1499@learnexpresscodersx-kuqyf.gcp.mongodb.net/library?retryWrites=true&w=majority/"

const connect = async () => {
  await mongoose.connect(URL,
    {
      useNewUrlParser: true 
    }
  )
}


module.exports = connect;