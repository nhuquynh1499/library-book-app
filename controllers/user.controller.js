const db = require("../db");
const multer = require("multer");

module.exports.index = (req, res) => {
  res.render("users/index", {
    users: db.get("users").value()
  });
};

module.exports.create = (req, res) => {
  res.render("users/create");
};

module.exports.postAvatar = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    }
  });
  const upload = multer({ storage }).single("");
  upload(req, res, function(err) {
    if (err) {
      return res.send(err);
    }
    console.log("file uploaded to server");
    console.log(req.file);

    // SEND FILE TO CLOUDINARY
    const cloudinary = require("cloudinary").v2;
    cloudinary.config({
      cloud_name: "###!!!###",
      api_key: "###!!!###",
      api_secret: "###!!!###"
    });

    const path = req.file.path;
    const uniqueFilename = new Date().toISOString();

    cloudinary.uploader.upload(
      path,
      { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
      function(err, image) {
        if (err) return res.send(err);
        console.log("file uploaded to Cloudinary");
        // remove file from server
        const fs = require("fs");
        fs.unlinkSync(path);
        // return image details
        res.json(image);
      }
    );
  });
};

module.exports.postCreate = (req, res) => {
  var name = req.body.name;
  var phone = req.body.phone;
  db.get("users")
    .push({
      id: db.get("users").value().length,
      name: name,
      phone: phone
    })
    .write();
  res.redirect("/users");
};

module.exports.delete = (req, res) => {
  var id = req.params.id;
  db.get("users")
    .remove({ id: parseInt(id) })
    .write();
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
