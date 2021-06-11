const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
    userId: String,
    name: String,
    starRating: String,
    address: String,
    city: String,
    zipCode: String,
    phone: String,
    facilities: [String],
    rooms: [Object],
    availableTypes: [String],
    totalRooms: Number,
    availableRooms: Number,
    roomGallery: [String],
    messaging: Boolean,
    userRating: Number,
    coaEnabled: Boolean,
    paymentAccount: Object
});

module.exports = mongoose.model('Business', BusinessSchema);
