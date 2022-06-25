const { readProducts, readProductDetail } = require('../models/product');

async function getProductsByCondition(mainCategory, subCategory, sort) {
  return await readProducts(mainCategory, subCategory, sort);
}

async function getProductDetail(id) {
  const getProductDetail = await readProductDetail(id);

  const filter = (arr, key) => {
    for (let i = 0; i < getProductDetail.length; i++) {
      let filteredItem = arr[i].filter((item, idx) => {
        return (
          arr[i].findIndex(item2 => {
            return item.id === item2.id;
          }) === idx
        );
      });
      getProductDetail[i][key] = filteredItem;
    }
  };

  const images = getProductDetail.map(e => {
    return e.productImages;
  });
  filter(images, 'productImages');

  const reviews = getProductDetail.map(e => {
    return e.productReviews;
  });
  filter(reviews, 'productReviews');

  return getProductDetail;
}

module.exports = { getProductsByCondition, getProductDetail };
