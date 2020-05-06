const mongoose = require('mongoose');

const URL = "mongodb+srv://ngngocnhuquynh0104:CodersX1499@learnexpresscodersx-kuqyf.gcp.mongodb.net/test?retryWrites=true&w=majority"

const connect = async () => {
  await mongoose.connect(URL,
    { 
      useUnifiedTopology: true,
      useNewUrlParser: true 
    }
  )
}


module.exports = connect;