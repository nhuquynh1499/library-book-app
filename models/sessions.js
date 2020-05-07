const mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
  cookieId: String,
  cart: Object
})

module.exports = mongoose.model('Session', sessionSchema)

