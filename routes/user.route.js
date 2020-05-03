const express = require("express");
const controller = require("../controllers/user.controller");
const validate = require("../validate/user.validate");
const multer = require("multer");

const upload = multer({ dest: "./public/uploads/" });

const router = express.Router();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", upload.single('avatar'), validate.postCreate, controller.postCreate);

router.get("/:id/delete", controller.delete);

router.get("/:id/update", controller.update);

router.post("/:id/update", upload.single('cover'), controller.postUpdate);

module.exports = router;
