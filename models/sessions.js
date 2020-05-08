const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var sessionSchema = new Schema({
  cookieId: String,
  cart: {
    book: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    quantity: Number
  }
})

module.exports = mongoose.model('Session', sessionSchema)

