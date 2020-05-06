const db = require('../db');
const mongoose = require('mongoose');
const bookModel = require('../models/books');
const shortId = require('shortid');

module.exports.index = async (req, res) => {
  var page = parseInt(req.query.page) || 1; // n - số thứ tự trang.
  var perPage = 8; // x - số lượng sản phẩm trong 1 trang.

  var start = (page - 1) * perPage;
  var end = page * perPage;
  
  
  var books = [];
  var books = books.concat(await bookModel.find())
  books.slice(start, end);
  var numberOfPages = Math.ceil(books.length / 8);
  res.render('books/index', {
    books: books,
    numberOfPages: numberOfPages
  })
}

module.exports.create = (req, res) => {
  res.render('books/create');
}

module.exports.postCreate = (req, res) => {
  var title = req.body.title;
  var description = req.body.description;
  var image = req.file.path.split('/').slice(1).join('/');
  var newBook = new bookModel({
    title: title,
    description: description,
    image: image
  });
  newBook.save();
  res.redirect('/books');
}

module.exports.delete = (req, res) => {
  bookModel.remove({ _id: req.params.id }).exec();
  res.redirect('/books');
}

module.exports.update = async(req, res) => {
  var book = await bookModel.find({ _id: req.params.id });
  console.log(book);
  res.render('books/update', {
    book: book
  })
}

module.exports.postUpdate = (req, res) => {
  var title = req.body.title;
  var description = req.body.description;
  var image = req.file.path.split('/').slice(1).join('/');
  console.log(req.params.id)
  bookModel.update(
    { _id: req.params.id }, 
    { 
      $set: { 
        title: title, 
        description: description, 
        image: image 
      }
    }
  ).exec()
  res.redirect('/books');
}

