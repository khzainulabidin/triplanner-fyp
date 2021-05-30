const express = require('express');
const router = express.Router();
const {register, verifyEmail, signIn, accountInfo, getMe, getFriendTrips, getUsersByCity, banUser, getUsers, uploadPhoto, deleteUser, deleteAccount, getUser, getOtherProfile, getProfileByUsername} = require('../controllers/account');
const protect = require('../middlewares/protect');
const {storage, limits} = require('../utils/uploadFile');
const multer = require('multer');

const upload = multer({storage: multer.diskStorage(storage), limits});

router.post('/register', register);
router.post('/verifyEmail/:iv/:content/:token', verifyEmail);
router.post('/signIn', signIn);
router.post('/accountInfo',protect, accountInfo);
router.get('/profile', protect, getMe);
router.post('/uploadPhoto', protect, upload.single('file'), uploadPhoto);
router.post('/deleteAccount', protect, deleteAccount);
router.get('/getUser/:type/:userId', getUser);
router.get('/getOtherProfile/:userId', getOtherProfile);
router.get('/getProfileByUsername/:username', getProfileByUsername);
router.get('/', protect, getUsers);
router.delete('/:id', protect, deleteUser);
router.put('/banUser', protect, banUser);
router.get('/getUsersByCity/:city', protect, getUsersByCity);
router.get('/getFriendTrips/:id', protect, getFriendTrips);

module.exports = router;
