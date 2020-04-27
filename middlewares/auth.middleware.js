const db = require('../db');

module.exports.requireAuth = (req, res, next) => {
  console.log(req.signedCookies.userId);
  if (!req.signedCookies.userId) {
    res.render('auth/login');
    return;
  }
  
  var user = db.get('users').find({ id: parseInt(req.signedCookies.userId) }).value();
  console.log(user);
  if (!user) {
    res.render('auth/login');
    return;
  }
  
  next();
}