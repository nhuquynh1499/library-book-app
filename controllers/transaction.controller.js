const db = require('../db');

module.exports.index = (req, res) => {
  var transactions = db.get('transactions').value();
  var lists = [];
  for (var item of transactions) {
    var userId = item.userId;
    var bookId = item.bookId;
    lists.push({
      user: db.get('users').find({ id: userId }).value().name,
      book: db.get('books').find({ id: bookId }).value().title
    })
  }
  res.render('transactions/index', {
    transactions: lists
  })
}

module.exports.create = (req, res) => {
  res.render('transactions/create', {
    users: db.get('users').value(),
    books: db.get('books').value()
  });
}

module.exports.postCreate = (req, res) => {
  var user = req.body.userSelect;
  var book = req.body.bookSelect;
  console.log(user, book);
  console.log(req.body.userSelect, req.body.bookSelect);
  db.get('transactions').push({
    id: db.get('transactions').value().length,
    userId: db.get('users').find({ name: user }).value().id,
    bookId: db.get('books').find({ title: book }).value().id
  }).write()
  res.redirect('/transactions');
};