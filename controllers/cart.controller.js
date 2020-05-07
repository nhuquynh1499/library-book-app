const db = require('../db');
const shortId = require('shortid');
const mongoose = require('mongoose');
const sessionModel = require('../models/sessions');
const userModel = require('../models/users')
const bookModel = require('../models/books')

module.exports.index = async (req, res, next) => {
  var sessionId = req.signedCookies.sessionId;
  var session = await sessionModel.find();
  var books = [];
  for (var bookId in session.cart) {
    var book = await bookModel.findOne({ _id: bookId });
    books.push(book);
  }
  res.render('cart/index', {
    books: books
  });
}

module.exports.addToCart = (req, res, next) => {
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect('/books');
    return;
  }

  var count = db
    .get('sessions')
    .find({ id: sessionId })
    .get('cart.' + bookId, 0)
    .value();

  var sessions = db.get('sessions')
    .find({ id: sessionId })
    .set('cart.' + bookId, count + 1)
    .write();

  res.redirect('/books');
}

module.exports.addTransaction = (req, res, next) => {
  var q = req.query.q;
  var listBookId = q.split(' ');
  for (var bookId of listBookId) {
    console.log(bookId);
    var id = shortId.generate();
    db.get('transactions').push({
      id: id,
      userId: req.signedCookies.userId,
      bookId: bookId,
      isComplete: false
    }).write();
    // db.get("sessions")
    // .remove({ id: req.signedCookies.sessionId})
    // .write();
    //res.clearCookie('sessionId');
  }
  
  res.redirect("/transactions");
}