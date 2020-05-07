//const db = require('../db');
const transactionModel = require('../models/transactions');

module.exports.complete = async (req, res, next) => {
  var transaction = await transactionModel.findOne({ _id: req.params.id });
  if (transaction){
    await transactionModel.update({ _id: req.params.id }, { isComplete: true }).exec();
  }
  next();
}