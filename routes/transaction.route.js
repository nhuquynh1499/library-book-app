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
  var name = req.body.name;
  var phone = req.body.phone
  db.get('transactions').push({
    id: db.get('transactions').value().length,
    name: name,
    phone: phone
  }).write()
  res.redirect('/transactions');
});

router.get("/:id/delete", (req, res) => {
  var id = req.params.id;
  db.get('transactions').remove({ id: parseInt(id) }).write();
  res.redirect('/transactions');
}) 

router.get("/:id/update", (req, res) => {
  var user = db.get('transactions').find({ id: parseInt(req.params.id)}).value();
  res.render('transactions/update', {
    user: user
  })
})

router.post("/:id/update", (req, res) => {
  db.get('transactions')
  .find({ id: parseInt(req.params.id) })
  .assign({ phone: req.body.phone })
  .write();
  res.redirect('/transactions');
})


module.exports = router;