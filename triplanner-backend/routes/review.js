const express = require('express');
const router = express.Router();
const protect = require('../middlewares/protect');
const {submitReview, getReviews, getUserReviews, deleteReview, getRating} = require('../controllers/review');

router.post('/', protect, submitReview);
router.get('/:itemId', getReviews);
router.get('/', protect, getUserReviews);
router.delete('/:itemId', protect, deleteReview);
router.get('/rating/:itemId', getRating);

module.exports = router;
