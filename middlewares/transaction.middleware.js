const db = require('../db');

module.exports.isAdmin = (req, res, next) => {
  var user = db.get('users').find({id: req.cookies.userId}).value();
  
  if (user.isAdmin)
}

module.exports.complete = (req, res, next) => {
  if (db.get('transactions').find({ id: parseInt(req.params.id) }).value()){
    db.get('transactions')
    .find({ id: parseInt(req.params.id) })
    .assign({ isComplete: true })
    .write();
  }
  next();
}