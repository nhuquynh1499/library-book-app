const db = require('../db');
const shortId = require('shortid');

module.exports.index = (req, res) => {
  var user = db.get('users').find({id: parseInt(req.signedCookies.userId)}).value();
  var transactions = []
  console.log(transactions = db.get('transactions').value())
  if (user.isAdmin) {
     transactions = db.get('transactions').value();
  } else {
     transactions = transactions.concat(db.get('transactions').find({ userId: user.id }).value());
  }
  var lists = [];
  for (var item of transactions) {
    var userId = item.userId;
    var bookId = item.bookId;
    lists.push({
      id: item.id,
      user: db.get('users').find({ id: parseInt(userId) }).value().name,
      book: db.get('books').find({ id: bookId }).value().title,
      isComplete: item.isComplete
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
  var id = shortId.generate();
  db.get('transactions').push({
    id: id,
    userId: db.get('users').find({ name: user }).value().id,
    bookId: db.get('books').find({ title: book }).value().id,
    isComplete: false
  }).write()
  res.redirect('/transactions');
};

module.exports.complete = (req, res) => { 
  res.redirect('/transactions');
};