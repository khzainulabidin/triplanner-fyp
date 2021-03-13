const express = require('express');
const router = express.Router();
const {addReview, getReview} = require('../controllers/review');

router.route('/').post(addReview);
router.route('/:place_id').get(getReview);

module.exports = router;
