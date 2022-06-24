const express = require('express');
const {
  productController,
  productDetailController,
} = require('../controllers/product');

const router = express.Router();

router.get('/products', productController);

router.get('/products/:id', productDetailController);

module.exports = router;
