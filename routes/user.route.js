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

const upload = multer({ storage }).single("avatar");

const router = express.Router();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", upload.single('avatar'), validate.postCreate, controller.postCreate);

router.get("/:id/delete", controller.delete);

router.get("/:id/update", controller.update);

router.post("/:id/update", controller.postUpdate);

module.exports = router;
