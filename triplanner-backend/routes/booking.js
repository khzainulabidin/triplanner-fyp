const express = require('express');
const router = express.Router();
const protect = require('../middlewares/protect');
const {getBookings, getAllBookings, deleteBooking, createPaymentIntent, refundPayment, getBooking} = require('../controllers/booking');

router.post('/', protect, getBookings);
router.get('/', protect, getAllBookings);
router.delete('/:id', protect, deleteBooking);
router.get('/:id', protect, getBooking);
router.post('/createPaymentIntent', protect, createPaymentIntent);
router.post('/refund', protect, refundPayment);

module.exports = router;
