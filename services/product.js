const { readProducts, readProductDetail } = require('../models/product');

async function getProducts(mainCategory, subCategory, sort) {
  return await readProducts(mainCategory, subCategory, sort);
}

async function getProductDetail(id) {
  return await readProductDetail(id);
}

module.exports = { getProducts, getProductDetail };
