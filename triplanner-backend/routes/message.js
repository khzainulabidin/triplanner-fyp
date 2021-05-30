const express = require('express');
const router = express.Router();
const protect = require('../middlewares/protect');
const {getMessages, postMessage, deleteMessage} = require('../controllers/message');

router.get('/:type', protect, getMessages);
router.post('/', protect, postMessage);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
