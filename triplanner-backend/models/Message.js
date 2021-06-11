const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    phone: String,
    name: String,
    email: String,
    message: String,
    hotelId: String,
    senderId: String,
    hotelName: String,
    replies: Array,
    receivedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Message', MessageSchema);
