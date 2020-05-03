const express = require('express');
const controller = require('../controllers/book.controller');
const multer = require("multer");

const upload = multer({ dest: "./public/uploads/" });

const router = express.Router();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", controller.postCreate);

router.get("/:id/delete", controller.delete);

router.get("/:id/update", controller.update);

router.post("/:id/update", upload.single('image'), controller.postUpdate);

module.exports = router;