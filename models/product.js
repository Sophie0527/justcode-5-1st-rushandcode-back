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
  const banner = ` Limit 12`;

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
    } else if (sort === 'banner') {
      // 판매인기순 12개
      return await prisma.$queryRawUnsafe(
        productsQuery + group + sellCountDesc + banner
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
        productsQuery + main + sub + group + sellCountDesc
      );
    }
    return await prisma.$queryRawUnsafe(productsQuery + main + sub + group);
  }
}

async function readProductDetail(id) {
  const reviewList =
    await prisma.$queryRaw`select * from reviews where product_id=${id}`;

  const productAndImages = `SELECT products.*, JSON_ARRAYAGG(JSON_OBJECT('id', IMG.id, 'url', IMG.image_url)) productImages`;
  const reviews = ` JSON_ARRAYAGG(JSON_OBJECT('id', REVW.id, 'content', REVW.content, 'stars', REVW.stars, 'created_at', REVW.created_at, 
                                              'user_name', REVW.user_name, 'user_id', REVW.user_id)) productReviews`;
  const joinImage = ` FROM products JOIN images as IMG ON IMG.product_id = products.id`;
  const joinReview = ` JOIN reviews as REVW ON REVW.product_id = products.id`;
  const condition = ` WHERE products.id=${id} GROUP BY products.id`;

  if (reviewList.length !== 0) {
    return await prisma.$queryRawUnsafe(
      productAndImages + ',' + reviews + joinImage + joinReview + condition
    );
  } else {
    return await prisma.$queryRawUnsafe(
      productAndImages + joinImage + condition
    );
  }
}

module.exports = {
  readProducts,
  readProductDetail,
};
