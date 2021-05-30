const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    userId: String,
    source: Object,
    destination: Object,
    departureTime: Number,
    destinations: Array,
    totalBudget: Number,
    usingOwnCar: Boolean,
    fuelAverage: Number,
    availableBudget: Number,
    timeDistances: Array,
    fuelType: String,
    fuelCost: Number,
    destinationIds: Array,
    numberOfGuests: Number,
    placesToStay: Array,
    usersAccompanying: Array,
    interests: Array,
    suggestedPlacesToVisit: Array,
    selectedRooms: Array,
    privacy: String,
    bookings: Array,
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Trip', TripSchema);
