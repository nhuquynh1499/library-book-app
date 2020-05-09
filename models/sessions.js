const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var sessionSchema = new Schema({
  cookieId: String,
  cart: Array
})

module.exports = mongoose.model('Session', sessionSchema)

