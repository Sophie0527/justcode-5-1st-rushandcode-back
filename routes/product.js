const express = require('express');
const { getProducts, productDetail } = require('../controllers/product');
const asyncWrap = require('../asyncWrap');

const router = express.Router();

router.get('/products', asyncWrap(getProducts));
router.get('/products/:id', asyncWrap(productDetail));

module.exports = router;
