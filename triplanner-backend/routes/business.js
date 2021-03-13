const express = require('express');
const router = express.Router();
const {saveBusinessDetails, saveRoomsInfo, saveHotelFacilities} = require('../controllers/business');
const {protect} = require('../middlewares/auth');

router.post('/saveBusinessDetails', protect, saveBusinessDetails);
router.put('/saveRoomsInfo', protect, saveRoomsInfo);
router.put('/saveHotelFacilities', protect, saveHotelFacilities)

module.exports = router;
