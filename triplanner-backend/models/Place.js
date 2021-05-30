const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    placeId: String,
    lat: Number,
    lng: Number
});

module.exports = mongoose.model('Place', PlaceSchema);
