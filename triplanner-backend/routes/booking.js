const express = require('express');
const router = express.Router();
const protect = require('../middlewares/protect');
const {getBookings, getAllBookings, deleteBooking} = require('../controllers/booking');

router.post('/', protect, getBookings);
router.get('/', protect, getAllBookings);
router.delete('/:id', protect, deleteBooking);

module.exports = router;
