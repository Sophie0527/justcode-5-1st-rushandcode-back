const { readProducts } = require('../models/product');

async function getProductsByCondition(mainCategory, subCategory, sort) {
  return await readProducts(mainCategory, subCategory, sort);
}

module.exports = { getProductsByCondition };
