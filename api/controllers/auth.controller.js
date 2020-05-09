const userModel = require('../../models/users');

module.exports.login = async (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  var user = await userModel.findOne({ email: email, password: password});
  
  res.json(user);
}