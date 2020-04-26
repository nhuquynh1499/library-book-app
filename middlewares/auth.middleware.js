const db = require('../db');

module.exports.requireAuth = (req, res, next) => {
  console.log(req.cookies.userId);
  if (!req.cookies.userId) {
    res.render('auth/login');
    return;
  }
  
  var user = db.get('users').find({ id: parseInt(req.cookies.userId) }).value();
  console.log(user);
  if (!user) {
    res.render('auth/login');
    return;
  }
  
  next();
}