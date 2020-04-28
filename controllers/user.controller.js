const db = require('../db');

module.exports.index = (req, res) => {
  var page = parseInt(req.query.page) || 1; // n - số thứ tự trang.
  var perPage = 8; // x - số lượng sản phẩm trong 1 trang.

  var start = (page - 1) * perPage;
  var end = page * perPage;

  var numberOfPages = Math.ceil(db.get('users').value().length / 8);
  var users = db.get('users').value().slice(start, end);
  res.render('users/index', {
    users: users,
    numberOfPages: numberOfPages
  })
  next();
};

module.exports.create = (req, res) => {
  res.render('users/create');
};

module.exports.postCreate = (req, res) => {
  var name = req.body.name;
  var phone = req.body.phone
  db.get('users').push({
    id: db.get('users').value().length,
    name: name,
    phone: phone
  }).write()
  res.redirect('/users');
};

module.exports.delete = (req, res) => {
  var id = req.params.id;
  db.get('users').remove({ id: parseInt(id) }).write();
  res.redirect('/users');
};

module.exports.update = (req, res) => {
  var user = db.get('users').find({ id: parseInt(req.params.id)}).value();
  res.render('users/update', {
    user: user
  })
}

module.exports.postUpdate = (req, res) => {
  db.get('users')
  .find({ id: parseInt(req.params.id) })
  .assign({ phone: req.body.phone })
  .write();
  res.redirect('/users');
}
