const express = require('express');
const db = require('../db');

const router = express.Router();

router.get("/", (req, res) => {
  // express helps us take JS objects and send them as JSON
  res.render('books/index', {
    user: db.get('user').value()
  })
});

router.get("/create", (req, res) => {
  res.render('books/create');
});

router.post("/create", (req, res) => {
  var title = req.body.title;
  var description = req.body.description;
  db.get('books').push({
    id: db.get('books').value().length,
    title: title,
    description: description
  }).write()
  res.redirect('/books');
});

router.get("/:id/delete", (req, res) => {
  var id = req.params.id;
  db.get('books').remove({ id: parseInt(id) }).write();
  res.redirect('/books');
}) 

router.get("/:id/update", (req, res) => {
  var book = db.get('books').find({ id: parseInt(req.params.id)}).value();
  res.render('books/update', {
    book: book
  })
})

router.post("/:id/update", (req, res) => {
   console.log(req.params);
  db.get('books')
  .find({ id: parseInt(req.params.id) })
  .assign({ title: req.body.title })
  .write();
  res.redirect('/books');
})


module.exports = router;