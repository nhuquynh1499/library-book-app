const mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
  cart: Object
})

module.exports = mongoose.model('Session', sessionSchema)

