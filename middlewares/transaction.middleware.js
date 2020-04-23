const db = require('../db');

module.exports.complete = (req, res, next) => {
  if (!db.get('transactions').find({ id: parseInt(req.params.id) }).value()){
    return;
  }
  
  next();
}