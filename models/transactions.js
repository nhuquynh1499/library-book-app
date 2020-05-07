const mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
  userId: String,
  bookId: String,
  isComplete: String
})

module.exports = mongoose.model('Book', transactionSchema)

