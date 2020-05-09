const transactionModel = require('../../models/transactions');

module.exports.index = async (req, res, next) => {
  var transactions = await transactionModel.find();
  res.json(transactions);
}

