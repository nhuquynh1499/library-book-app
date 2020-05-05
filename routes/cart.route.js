const express = require('express');

const controller = require('../controllers/cart.controller');
//const validate = require('../validate/auth.validate');

const router = express.Router();

router.get('/', controller.index);

router.get('/add/:bookId', controller.addToCart);

router.get('/brown', controller.addTransaction);

module.exports = router;