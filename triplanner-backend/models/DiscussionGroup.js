const mongoose = require('mongoose');

const DiscussionGroupSchema = new mongoose.Schema({
    destinationId: String,
    departureTime: Number,
    messages: Array,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('DiscussionGroup', DiscussionGroupSchema);
