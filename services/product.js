const { readProducts } = require('../models/product');

async function getAllProducts(mainCategory, subCategory, sort) {
  return await readProducts(mainCategory, subCategory, sort);
}

module.exports = { getAllProducts };
