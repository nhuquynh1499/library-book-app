const db = require('../db');

module.exports.index = (req, res) => {
  var page = parseInt(req.query.page) || 1; // n - số thứ tự trang.
  var perPage = 8; // x - số lượng sản phẩm trong 1 trang.

  var start = (page - 1) * perPage;
  var end = page * perPage;

  var numberOfPages = Math.ceil(db.get('books').value().length / 8);
  var books = db.get('books').value().slice(start, end);
  res.render('books/index', {
    books: books,
    numberOfPages: numberOfPages
  })
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
  req.body.image = req.file.path.split('/').slice(1).join('/');
  db.get('books')
  .find({ id: parseInt(req.params.id) })
  .assign(req.body)
  .write();
  res.redirect('/books');
}

