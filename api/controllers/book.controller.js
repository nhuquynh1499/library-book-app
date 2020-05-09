const bookModel = require('../../models/books');

module.exports.index = async (req, res, next) => {
  var books = await bookModel.find();
  res.json(books);
}

