const mongoose = require('mongoose');
const userModel = require('../models/users');

module.exports.requireAuth = async (req, res, next) => {
  if (!req.signedCookies.userId) {
    res.render('auth/login');
    return;
  }
  
  //var user = db.get('users').find({ id: parseInt(req.signedCookies.userId) }).value();
  var user = await userModel.findOne({ _id: req.signedCookies.userId });
  if (!user) {
    res.render('auth/login');
    return;
  }
  
  next();
}