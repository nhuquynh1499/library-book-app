module.exports.countCookie = (req, res, next) => {
  if (!req.cookies) {
    res.cookie('countCookie', 1);
  } else {
    req.cookies.countCookie++
  }
  console.log(req.cookies);
  next();
}