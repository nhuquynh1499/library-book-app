const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const md5 = require('md5');

module.exports.login = (req, res) => {
  res.render('auth/login');
}

module.exports.postLogin = (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  var user = db.get('users').find({email: email}).value();
  
  if (!user) {
    res.render('auth/login', {
      errors: [
        'User is not exist'
      ],
      value: req.body
    })
    return;
  }
  
  var result = bcrypt.compareSync(req.body.password, user.password); 
        if (!result) {
          res.render('auth/login', {
            errors: [
              'Wrong password.'
            ],
            value: req.body
          })
        }
  
  res.cookie('userId', user.id);
  res.redirect('/transactions');
}