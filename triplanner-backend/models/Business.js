const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
    user_id: String,
    businessName: String,
    starRating: Number,
    phone: String,
    chatFeature: Boolean,
    streetAddress: String,
    city: String,
    zipCode: Number,
    rooms: Array,
    facilities: Array,
    checkin: String,
    checkout: String
});

module.exports = mongoose.model('Business', BusinessSchema);