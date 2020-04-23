const db = require('../db');

module.exports.index = (req, res) => {
  res.render('books/index', {
    books: db.get('books').value()
  });
}

module.exports.create = (req, res) => {
  res.render('books/create');
}

module.exports.postCreate = (req, res) => {
  var title = req.body.title;
  var description = req.body.description;
  db.get('books').push({
    id: db.get('books').value().length,
    title: title,
    description: description
  }).write()
  res.redirect('/books');
}

module.exports.delete = (req, res) => {
  var id = req.params.id;
  db.get('books').remove({ id: parseInt(id) }).write();
  res.redirect('/books');
}

module.exports.update = (req, res) => {
  var book = db.get('books').find({ id: parseInt(req.params.id)}).value();
  res.render('books/update', {
    book: book
  })
}

module.exports.postUpdate = (req, res) => {
   console.log(req.params);
  db.get('books')
  .find({ id: parseInt(req.params.id) })
  .assign({ title: req.body.title })
  .write();
  res.redirect('/books');
}

