const express = require("express");
const controller = require("../controllers/user.controller");
const validate = require("../validate/user.validate");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  }
});

const router = express.Router();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", validate.postCreate, controller.postCreate);

router.post("/uploads", (req, res, next) => {
  const upload = multer({ storage }).single("avatar");
  upload(req, res, function(err) {
    if (err) {
      return res.send(err);
    }
    console.log("file uploaded to server");
    console.log(req.file);

    // SEND FILE TO CLOUDINARY
    const cloudinary = require("cloudinary").v2;
    cloudinary.config({
      cloud_name: process.ENV.CLOUD_NAME,
      api_key: process.ENV.API_KEY,
      api_secret: process.ENV.API_SECRET
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
});

router.get("/:id/delete", controller.delete);

router.get("/:id/update", controller.update);

router.post("/:id/update", controller.postUpdate);

module.exports = router;
