const mongoose = require('mongoose');

const URL = "mongodb+srv://ngngocnhuquynh0104:coderxawesome@cluster0-kuqyf.mongodb.net/test?retryWrites=true&w=majority"

const connect = async () => {
  await mongoose.connect(URL,
    {
      useNewUrlParser: true 
    }
  )
}


module.exports = connect;