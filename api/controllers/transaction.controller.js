const transactionModel = require('../../models/transactions');

module.exports.index = async (req, res, next) => {
  if (req.params.id) {
    var transactions = await transactionModel.findOne({ _id: req.params.id})
  } else {
    var transactions = await transactionModel.find();
  }
  res.json(transactions);
}

module.exports.create = async (req, res, next) => {
  var transactions = await transactionModel.create(req.body);
  res.json(transactions);
}

module.exports.update = async (req, res, next) => {
  var transactions = await transactionModel.update({ 
    _id: req.params.id 
  }, {
    isComplete: true
  }).exec();
}

module.exports.delete = async (req, res, next) => {
  var transactions = await transactionModel.del
}