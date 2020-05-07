//const db = require('../db');
const transactionModel = require('../models/transactions');

module.exports.complete = (req, res, next) => {
  var transaction = 
  if (db.get('transactions').find({ id: parseInt(req.params.id) }).value()){
    db.get('transactions')
    .find({ id: parseInt(req.params.id) })
    .assign({ isComplete: true })
    .write();
  }
  next();
}