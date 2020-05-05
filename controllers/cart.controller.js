const db = require('../db');
const shortId = require('shortid');

module.exports.index = (req, res, next) => {
  var sessionId = req.signedCookies.sessionId;
  var session = db.get('sessions').find({ id: sessionId }).value()
  var books = [];
  for (var bookId in session.cart)
    books.push(db.get('books').find({ id: bookId }).value());
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
  console.log(db.get('sessions').find({ id: sessionId }).value())

  res.redirect('/books');
}

module.exports.addTransaction = (req, res, next) => {
  var q = req.query.q;
  var listBookId = q.split(' ');
  for (var bookId in listBookId) {
    var id = shortId.generate();
    db.get('transactions').push({
      id: id,
      userId: req.signedCookies.userId,
      bookId: bookId,
      isComplete: false
    }).write();
    db.get("sessions")
    .remove({ id: req.signedCookies.sessionId})
    .write();
  }
  
  res.redirect("/transactions");
}