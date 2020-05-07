const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  phone: String,
  avatar: String
})

module.exports = mongoose.model('User', userSchema)

