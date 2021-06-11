const express = require('express');
const router = express.Router();
const protect = require('../middlewares/protect');
const {
    updateProfile,
    updateFacilities,
    updateRooms,
    updateRoom,
    deleteGalleryPhoto,
    updateMessaging,
    checkoutBooking,
    getBusinessesByLocation,
    bookRoom,
    updateCoa,
    updatePaymentAccount
} = require('../controllers/business');

router.put('/profile', protect, updateProfile);
router.put('/facilities', protect, updateFacilities);
router.put('/rooms', protect, updateRooms);
router.put('/room', protect, updateRoom);
router.put('/messaging', protect, updateMessaging);
router.put('/booking', protect, checkoutBooking);
router.post('/deleteGalleryPhoto', protect, deleteGalleryPhoto);
router.get('/businessesByLocation/:location', getBusinessesByLocation);
router.post('/bookRoom', protect, bookRoom);
router.put('/coa', protect, updateCoa);
router.put('/paymentAccount', protect, updatePaymentAccount);

module.exports = router;
