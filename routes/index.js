const express = require('express');

const userRouter = require('./user');
const productRouter = require('./product');
const reviewRouter = require('./review');

const router = express.Router();

router.use(userRouter);
router.use(productRouter);
router.use(reviewRouter);

module.exports = router;
