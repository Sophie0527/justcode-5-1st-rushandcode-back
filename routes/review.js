const express = require('express');
const {
  postReviews,
  putReviews,
  removeReviews,
} = require('../controllers/review');

const router = express.Router();

router.post('/review', postReviews);

router.put('/review/:id', putReviews);

router.delete('/review/:id', removeReviews);

module.exports = router;
