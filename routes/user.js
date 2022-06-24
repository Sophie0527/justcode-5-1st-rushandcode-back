const express = require('express');
const { signupController, loginController } = require('../controllers/user');
const asyncWrap = require('../asyncWrap');

const router = express.Router();

router.post('/signup', asyncWrap(signupController));
router.post('/login', asyncWrap(loginController));

module.exports = router;
