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
    var user = await userModel.findOne({ _id: item.userId });
    var book = await bookModel.findOne({ _id: item.bookId });
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

module.exports.create = async (req, res) => {
  var users = await userModel.find();
  var books = await bookModel.find();
  res.render('transactions/create', {
    users: users,
    books: books
  });
}

module.exports.postCreate = async (req, res) => {
  var user = await userModel.findOne({ name: req.body.userSelect });
  var book = await bookModel.findOne({ title: req.body.bookSelect });
  
  transactionModel.create({
    userId: user.id,
    bookId: book.id,
    isComplete: false
  }).write()
  res.redirect('/transactions');
};

module.exports.complete = (req, res) => { 
  res.redirect('/transactions');
};