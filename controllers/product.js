const { getProductsByCondition } = require('../services/product');

const getProducts = async (req, res) => {
  try {
    const { mainCategory, subCategory, sort } = req.query;
    const products = await getProductsByCondition(
      mainCategory,
      subCategory,
      sort
    );
    return res.status(200).json({ message: 'OK', products });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { getProducts };
