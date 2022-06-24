const express = require('express');

const userRouter = require('./user');
const productRouter = require('./product');

const router = express.Router();

router.use(userRouter);
router.use(productRouter);

module.exports = router;
