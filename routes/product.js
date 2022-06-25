const express = require('express');
const { getProducts, productDetail } = require('../controllers/product');

const router = express.Router();

router.get('/products', getProducts);

router.get('/products/:id', productDetail);

module.exports = router;
