const express = require('express');
const { productController, productDetail } = require('../controllers/product');

const router = express.Router();

router.get('/products', productController);

router.get('/products/:id', productDetail);

module.exports = router;
