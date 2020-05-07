const mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
  userId: String,
  bookId: String,
  isComplete: Boolean
})

module.exports = mongoose.model('Transaction', transactionSchema)

