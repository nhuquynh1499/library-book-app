const db = require('../db');

module.exports.complete = (req, res, next) => {
  if (db.get('transactions').find({ id: parseInt(req.params.id) }).value()){
    db.get('transactions')
    .find({ id: parseInt(req.params.id) })
    .assign({ isComplete: true })
    .write();
  }
  next();
}