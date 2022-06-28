const {
  getProductsByCondition,
  getProductDetail,
} = require('../services/product');

const getProducts = async (req, res) => {
  const { mainCategory, subCategory, sort } = req.query;
  const products = await getProductsByCondition(
    mainCategory,
    subCategory,
    sort
  );
  return res.status(200).json({ message: 'OK', products });
};

const productDetail = async (req, res) => {
  const { id } = req.params;
  const products = await getProductDetail(id);
  return res.status(200).json({ message: 'OK', products });
};

module.exports = {
  getProducts,
  productDetail,
};
