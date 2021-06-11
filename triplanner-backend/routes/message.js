const express = require('express');
const router = express.Router();
const protect = require('../middlewares/protect');
const {getMessages, postMessage, deleteMessage, sendReply} = require('../controllers/message');

router.get('/:type', protect, getMessages);
router.post('/', protect, postMessage);
router.post('/reply', protect, sendReply);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
