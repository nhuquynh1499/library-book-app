const db = require('../db');

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