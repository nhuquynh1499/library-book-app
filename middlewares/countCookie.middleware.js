const cookieParser = require('cookie-parser');

module.exports.countCookie = (req, res, next) => {
  if (!req.cookies) {
    res.cookie('countCookie', 1);
  } else {
    //req.cookies.countCookie++
  }
  next();
}