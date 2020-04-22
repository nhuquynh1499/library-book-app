const express = require('express');
const db = require('../db');

const router = express.Router();

router.get("/", (req, res) => {
  res.render('transactions/index', {
    transactions: db.get('transactions').value()
  })
});

router.get("/create", (req, res) => {
  res.render('transactions/create', {
    users: db.get('users').value(),
    books: db.get('books').value()
  });
});

router.post("/create", (req, res) => {
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
});


module.exports = router;