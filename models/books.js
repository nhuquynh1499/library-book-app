const mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
  id: String,
  image: String,
  title: String,
  description: String
})

module.exports = mongoose.model('Book', bookSchema)

