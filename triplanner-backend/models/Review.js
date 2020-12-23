const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    place_id: String,
    user_id: String,
    review: String,
    rating: Number,
    recommended: Boolean,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', ReviewSchema);