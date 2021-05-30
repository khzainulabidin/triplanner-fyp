const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    itemId: String,
    name: String,
    userId: String,
    rating: Number,
    review: String,
    reviewedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', ReviewSchema);
