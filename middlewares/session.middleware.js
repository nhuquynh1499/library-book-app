const db = require("../db");
const shortId = require("shortid");

module.exports = (req, res, next) => {
  if (!req.signedCookies.sessionId) {
    var sessionId = shortId.generate();
    res.cookie('sessionId', sessionId, {
      signed: true
    });
    db.get("sessions").push({ id: sessionId }).write();
  }
  
  var sessionId = req.signedCookies.sessionId;
  var session = db.get('sessions').find({ id: sessionId }).value();
  res.locals.numberInCart = (!session) ? 0 : Object.values(session.cart).reduce((total, num) => {return total + num}, 0)
  
  next();
}