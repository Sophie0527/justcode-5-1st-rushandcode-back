const prisma = require('./prisma-client');

async function readProducts(mainCategory, subCategory, sort) {
  if (mainCategory === undefined) {
    if (sort === 'desc') {
      // 높은가격순
      return await prisma.$queryRaw`
        SELECT products.name, products.hashtags, products.price, JSON_ARRAYAGG(JSON_OBJECT('id', IMG.id, 'url', IMG.image_url)) productImages
        FROM products
        JOIN (
          SELECT * FROM images) as IMG
        ON IMG.product_id = products.id
        GROUP BY products.id
        ORDER BY price desc;
      `;
    } else if (sort === 'asc') {
      // 낮은가격순
      return await prisma.$queryRaw`
        SELECT products.name, products.hashtags, products.price, JSON_ARRAYAGG(JSON_OBJECT('id', IMG.id, 'url', IMG.image_url)) productImages
        FROM products
        JOIN (
          SELECT * FROM images) as IMG
        ON IMG.product_id = products.id
        GROUP BY products.id
        ORDER BY price asc;
      `;
    } else if (sort === 'sell') {
      // 판매인기순
      return await prisma.$queryRaw`
        SELECT products.name, products.hashtags, products.price, JSON_ARRAYAGG(JSON_OBJECT('id', IMG.id, 'url', IMG.image_url)) productImages
        FROM products
        JOIN (
          SELECT * FROM images) as IMG
        ON IMG.product_id = products.id
        GROUP BY products.id
        ORDER BY sell_count desc;
      `;
    }
    // 추천순
    return await prisma.$queryRaw`
      SELECT products.name, products.hashtags, products.price, JSON_ARRAYAGG(JSON_OBJECT('id', IMG.id, 'url', IMG.image_url)) productImages
      FROM products
      JOIN (
        SELECT * FROM images) as IMG
      ON IMG.product_id = products.id
      GROUP BY products.id
      ORDER BY price desc;
    `;
  } else if (mainCategory !== undefined && subCategory === undefined) {
    if (sort === 'desc') {
      return await prisma.$queryRaw`
        SELECT products.name, products.hashtags, products.price, JSON_ARRAYAGG(JSON_OBJECT('id', IMG.id, 'url', IMG.image_url)) productImages
        FROM products
        JOIN (
          SELECT * FROM images) as IMG
        ON IMG.product_id = products.id
        WHERE main_category=${mainCategory}
        GROUP BY products.id
        order by price desc;
      `;
    } else if (sort === 'asc') {
      return await prisma.$queryRaw`
        SELECT products.name, products.hashtags, products.price, JSON_ARRAYAGG(JSON_OBJECT('id', IMG.id, 'url', IMG.image_url)) productImages
        FROM products
        JOIN (
          SELECT * FROM images) as IMG
        ON IMG.product_id = products.id
        WHERE main_category=${mainCategory}
        GROUP BY products.id
        order by price asc;
      `;
    } else if (sort === 'sell') {
      return await prisma.$queryRaw`
        SELECT products.name, products.hashtags, products.price, JSON_ARRAYAGG(JSON_OBJECT('id', IMG.id, 'url', IMG.image_url)) productImages
        FROM products
        JOIN (
          SELECT * FROM images) as IMG
        ON IMG.product_id = products.id
        WHERE main_category=${mainCategory}
        GROUP BY products.id
        order by sell_count desc;
      `;
    }
    return await prisma.$queryRaw`
      SELECT products.name, products.hashtags, products.price, JSON_ARRAYAGG(JSON_OBJECT('id', IMG.id, 'url', IMG.image_url)) productImages
      FROM products
      JOIN (
        SELECT * FROM images) as IMG
      ON IMG.product_id = products.id
      WHERE main_category=${mainCategory}
      GROUP BY products.id;
    `;
  } else if (mainCategory !== undefined && subCategory !== undefined) {
    if (sort === 'desc') {
      return await prisma.$queryRaw`
        SELECT products.name, products.hashtags, products.price, JSON_ARRAYAGG(JSON_OBJECT('id', IMG.id, 'url', IMG.image_url)) productImages
        FROM products
        JOIN (
          SELECT * FROM images) as IMG
        ON IMG.product_id = products.id
        WHERE main_category=${mainCategory} and sub_category=${subCategory}
        GROUP BY products.id
        order by price desc;
      `;
    } else if (sort === 'asc') {
      return await prisma.$queryRaw`
        SELECT products.name, products.hashtags, products.price, JSON_ARRAYAGG(JSON_OBJECT('id', IMG.id, 'url', IMG.image_url)) productImages
        FROM products
        JOIN (
          SELECT * FROM images) as IMG
        ON IMG.product_id = products.id
        WHERE main_category=${mainCategory} and sub_category=${subCategory}
        GROUP BY products.id
        order by price asc;
      `;
    } else if (sort === 'sell') {
      return await prisma.$queryRaw`
        SELECT products.name, products.hashtags, products.price, JSON_ARRAYAGG(JSON_OBJECT('id', IMG.id, 'url', IMG.image_url)) productImages
        FROM products
        JOIN (
          SELECT * FROM images) as IMG
        ON IMG.product_id = products.id
        WHERE main_category=${mainCategory} and sub_category=${subCategory}
        GROUP BY products.id
        order by sell_count desc;
      `;
    }
    return await prisma.$queryRaw`
      SELECT products.name, products.hashtags, products.price, JSON_ARRAYAGG(JSON_OBJECT('id', IMG.id, 'url', IMG.image_url)) productImages
      FROM products
      JOIN (
        SELECT * FROM images) as IMG
      ON IMG.product_id = products.id
      WHERE main_category=${mainCategory} and sub_category=${subCategory}
      GROUP BY products.id;
    `;
  }
}

module.exports = { readProducts };
