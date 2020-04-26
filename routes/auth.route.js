const express = require('express');
const controller = require('../controllers/auth.controller');
const validate = require('../validate/auth.validate');

const router = express.Router();

router.get("/login", controller.login);

router.post("/login", validate.login, controller.postLogin);

module.exports = router;