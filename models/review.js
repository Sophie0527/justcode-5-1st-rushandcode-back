const prisma = require('./prisma-client');

async function createReviews(user_id, user_name, product_id, content, stars) {
  const createReviews = await prisma.$queryRaw`
    INSERT INTO 
      reviews (user_id, user_name, product_id, content, stars)
    VALUES 
      (${user_id}, ${user_name}, ${product_id}, ${content}, ${stars})
  `;
  return createReviews;
}

async function updateReviews(id, content, stars) {
  const reviewEdit = await prisma.$queryRaw`
    UPDATE reviews SET content = (${content}), stars = (${stars})
    WHERE id = ${id};
  `;
  return reviewEdit;
}

async function deleteReviews(id) {
  const reviewDelete = await prisma.$queryRaw`
      DELETE FROM reviews 
      WHERE id = ${id};
    `;
  return reviewDelete;
}

module.exports = { createReviews, updateReviews, deleteReviews };
