const db = require('../db');

module.exports.requireAuth = (req, res, next) => {
  console.log(req.cookies.userId);
  if (!req.cookies.userId) {
    res.render('auth/login');
    return;
  }
  
  var user = db.get('users').find({ id: req.cookies.userId }).value();
  if (!user) {
    res.render('auth/login');
    return;
  }
  
  next();
  console.log(2)
}