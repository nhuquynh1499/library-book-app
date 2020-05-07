const db = require('../db');
const shortId = require('shortid');
const mongoose = require('mongoose');
const transactionModel = require('../models/transactions');
const userModel = require('../models/users')
const bookModel = require('../models/books')

module.exports.index = async (req, res) => {
  var user = userModel.findOne({id: parseInt(req.signedCookies.userId)});
  var transactions = []
  if (user.isAdmin) {
     transactions = transactionModel.find();
  } else {
     transactions = transactions.concat(transactionModel.find({ userId: user.id }));
  }
  var lists = [];
  for (var item of transactions) {
    var user = await userModel.findOne({ id: item.userId });
    var book = await bookModel.findOne({ id: item.bookId });
    lists.push({
      id: item.id,
      user: user.name,
      book: book.title,
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