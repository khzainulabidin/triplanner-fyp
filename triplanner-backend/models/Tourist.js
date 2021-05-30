const mongoose = require('mongoose');

const TouristSchema = new mongoose.Schema({
    userId: String,
    name: String,
    gender: String,
    dob: String,
    interests: [String],
    city: String,
    phone: String,
    friends: Array,
    friendRequests: Array,
    tripJoinRequests: Array,
});

module.exports = mongoose.model('Tourist', TouristSchema);
