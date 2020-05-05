const db = require('../db');

module.exports.requireAuth = (req, res, next) => {
  if (!req.signedCookies.userId) {
    res.render('auth/login');
    return;
  }
  
  var user = db.get('users').find({ id: parseInt(req.signedCookies.userId) }).value();
  if (!user) {
    res.render('auth/login');
    return;
  }
  
  next();
}