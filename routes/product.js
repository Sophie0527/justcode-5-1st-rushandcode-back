const express = require('express');
const { productController } = require('../controllers/product');

const router = express.Router();

router.get('/products', productController);

module.exports = router;
