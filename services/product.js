const { readProducts } = require('../models/product');

async function getProducts(mainCategory, subCategory, sort) {
  return await readProducts(mainCategory, subCategory, sort);
}

module.exports = { getProducts };
