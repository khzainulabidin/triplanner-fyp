const express = require('express');
const router = express.Router();
const protect = require('../middlewares/protect');
const {updateInterests, updateProfile, requestToJoin, updateFriend} = require('../controllers/tourist');

router.put('/interests', protect, updateInterests);
router.put('/profile', protect, updateProfile);
router.put('/requestToJoin', requestToJoin);
router.put('/updateFriend', protect, updateFriend);

module.exports = router;
