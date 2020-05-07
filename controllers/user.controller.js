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
  await userModel.remove({ _id: req.params.id }).exec();
  res.redirect("/users");
};

module.exports.update = async (req, res) => {
  var user = await userModel.findOne({ _id: req.params.id });
  res.render("users/update", {
    user: user
  });
};

module.exports.postUpdate = async (req, res) => {
  var name = req.body.name;
  var phone = req.body.phone;
  var file = await cloudinary.uploader.upload(req.file.path);
  await userModel.update(
    { _id: req.params.id }, 
    { 
      $set: { 
        name: name, 
        phone: phone, 
        avatar: file.url 
      }
    }
  ).exec()
  res.redirect("/users");
};
