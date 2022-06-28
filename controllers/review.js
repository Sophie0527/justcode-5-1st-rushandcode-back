const {
  createReviews,
  updateReviews,
  deleteReviews,
} = require('../models/review');

const postReviews = async (req, res) => {
  try {
    const { user_id, user_name, product_id, content, stars } = req.body;
    await createReviews(user_id, user_name, product_id, content, stars);

    return res.status(200).json({ message: 'CREATED' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const putReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, stars } = req.body;

    await updateReviews(id, content, stars);

    return res.status(200).json({ message: 'UPDATED' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const removeReviews = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteReviews(id);

    return res.status(200).json({ message: 'DELETE' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { postReviews, putReviews, removeReviews };
