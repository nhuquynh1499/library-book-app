const express = require("express");
const controller = require("../controllers/user.controller");
const validate = require("../validate/user.validate");

const router = express.Router();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", validate.postCreate, controller.postCreate);

router.get("/:id/delete", controller.delete);

router.get("/:id/update", controller.update);

router.post("/:id/update", controller.postUpdate);

module.exports = router;
