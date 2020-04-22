const express = require('express');
const db = require('../db');

const router = express.Router();

router.get("/", (req, res) => {
  // express helps us take JS objects and send them as JSON
  res.render('users/index', {
    users: db.get('users').value()
  })
});

router.get("/create", (req, res) => {
  res.render('users/create');
});

router.post("/create", (req, res) => {
  var name = req.body.name;
  var phone = req.body.phone
  db.get('users').push({
    id: db.get('users').value().length,
    name: name,
    phone: phone
  }).write()
  res.redirect('/users');
});

router.get("/:id/delete", (req, res) => {
  var id = req.params.id;
  db.get('users').remove({ id: parseInt(id) }).write();
  res.redirect('/users');
}) 

router.get("/:id/update", (req, res) => {
  var user = db.get('users').find({ id: parseInt(req.params.id)}).value();
  res.render('users/update', {
    user: user
  })
})

router.post("/:id/update", (req, res) => {
  db.get('users')
  .find({ id: parseInt(req.params.id) })
  .assign({ phone: req.body.phone })
  .write();
  res.redirect('/users');
})


module.exports = router;