const db = require("../db");
var cloudinary = require("cloudinary");
const shortId = require("shortid");
const mongoose = require('mongoose');
const userModel = require('../models/users');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

module.exports.index = async (req, res) => {
  res.render("users/index", {
    users: await userModel.find()
  });
};

module.exports.create = (req, res) => {
  res.render("users/create");
};

module.exports.postCreate = async (req, res) => {
  var file = await cloudinary.uploader.upload(req.file.path);
  var newUser = new userModel({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    avatar: file.url,
    isAdmin: false
  })
  await newUser.save();
  res.redirect("/users");
};

module.exports.delete = async (req, res) => {
  var id = req.params.id;
  await userModel.remove({ _id: req.params.id }).exec()
  res.redirect("/users");
};

module.exports.update = (req, res) => {
  var user = db
    .get("users")
    .find({ id: parseInt(req.params.id) })
    .value();
  res.render("users/update", {
    user: user
  });
};

module.exports.postUpdate = (req, res) => {
  db.get("users")
    .find({ id: parseInt(req.params.id) })
    .assign({ phone: req.body.phone })
    .write();
  res.redirect("/users");
};
