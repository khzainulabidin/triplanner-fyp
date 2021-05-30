const express = require('express');
const router = express.Router();
const protect = require('../middlewares/protect');
const {getGroup, sendMessage} = require('../controllers/discussionGroup');

router.get('/:destinationId/:departureTime', protect, getGroup);
router.put('/', protect, sendMessage);

module.exports = router;
