const express = require('express');
const db = require('../db.js');

const router = express.Router();

router.get("/books", (req, res) => {
  // express helps us take JS objects and send them as JSON
  res.render('index', {
    books: db.get('books').value()
  })
});

app.get("/books/create", (req, res) => {
  res.render('create');
});

app.post("/books/create", (req, res) => {
  var title = req.body.title;
  var description = req.body.description;
  db.get('books').push({
    id: db.get('books').value().length,
    title: title,
    description: description
  }).write()
  res.redirect('/books');
});

app.get("/books/:id/delete", (req, res) => {
  var id = req.params.id;
  db.get('books').remove({ id: parseInt(id) }).write();
  res.redirect('/books');
}) 

app.get("/books/:id/update", (req, res) => {
  var book = db.get('books').find({ id: parseInt(req.params.id)}).value();
  res.render('update', {
    book: book
  })
})

app.post("/books/:id/update", (req, res) => {
   console.log(req.params);
  db.get('books')
  .find({ id: parseInt(req.params.id) })
  .assign({ title: req.body.title })
  .write();
  res.redirect('/books');
})