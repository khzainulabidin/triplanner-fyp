const express = require('express');
const {
    register,
    login,
    getMe,
    updateDetails
} = require('../controllers/auth');

const router = express.Router();
const {protect} = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/updateDetails', protect, updateDetails);
router.post('/verifyEmail/:iv/:content/:token')

module.exports = router;