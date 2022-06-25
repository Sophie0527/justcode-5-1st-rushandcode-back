const prisma = require('./prisma-client');

async function readProducts(mainCategory, subCategory, sort) {
  const productsQuery = `SELECT products.id, products.name, products.hashtags, products.price,
                         JSON_ARRAYAGG(JSON_OBJECT('id', IMG.id, 'url', IMG.image_url)) productImages
                         FROM products
                         JOIN (
                           SELECT * FROM images) as IMG
                         ON IMG.product_id = products.id
                         `;
  const group = ' GROUP BY products.id';
  const desc = ' ORDER BY price desc';
  const asc = ' ORDER BY price asc';
  const sellCountDesc = ' ORDER BY sell_count desc';
  const main = ` WHERE main_category="${mainCategory}"`;
  const sub = ` AND sub_category="${subCategory}"`;

  if (mainCategory === undefined) {
    if (sort === 'desc') {
      // 높은가격순
      return await prisma.$queryRawUnsafe(productsQuery + group + desc);
    } else if (sort === 'asc') {
      // 낮은가격순
      return await prisma.$queryRawUnsafe(productsQuery + group + asc);
    } else if (sort === 'sell') {
      // 판매인기순
      return await prisma.$queryRawUnsafe(
        productsQuery + group + sellCountDesc
      );
    }
    // 추천순
    return await prisma.$queryRawUnsafe(productsQuery + group);
  } else if (mainCategory !== undefined && subCategory === undefined) {
    if (sort === 'desc') {
      return await prisma.$queryRawUnsafe(productsQuery + main + group + desc);
    } else if (sort === 'asc') {
      return await prisma.$queryRawUnsafe(productsQuery + main + group + asc);
    } else if (sort === 'sell') {
      return await prisma.$queryRawUnsafe(
        productsQuery + main + group + sellCountDesc
      );
    }
    return await prisma.$queryRawUnsafe(productsQuery + main + group);
  } else if (mainCategory !== undefined && subCategory !== undefined) {
    if (sort === 'desc') {
      return await prisma.$queryRawUnsafe(
        productsQuery + main + sub + group + desc
      );
    } else if (sort === 'asc') {
      return await prisma.$queryRawUnsafe(
        productsQuery + main + sub + group + asc
      );
    } else if (sort === 'sell') {
      return await prisma.$queryRawUnsafe(
        productsQuery + main + sub + group + sell
      );
    }
    return await prisma.$queryRawUnsafe(productsQuery + main + sub + group);
  }
}

async function readProductDetail(id) {
  const productDetail = await prisma.$queryRaw`
  SELECT products.*,
  JSON_ARRAYAGG(JSON_OBJECT('id', IMG.id, 'url', IMG.image_url)) productImages,
  JSON_ARRAYAGG(JSON_OBJECT('id', REVW.id, 'content', REVW.content, 'stars', REVW.stars)) productReviews
  FROM products
  JOIN images as IMG ON IMG.product_id = products.id
  JOIN reviews as REVW ON REVW.product_id = products.id
  WHERE products.id=${id}
  GROUP BY products.id`;
  return productDetail;
}

module.exports = { readProducts, readProductDetail };
