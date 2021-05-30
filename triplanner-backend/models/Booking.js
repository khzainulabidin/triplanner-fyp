const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    phone: String,
    guests: Number,
    name: String,
    email: String,
    roomType: String,
    checkIn: String,
    checkOut: String,
    status: String,
    customerId: String,
    hotelId: String,
    city: String,
    hotel: String,
    paymentMethod: String,
    payment: String,
    bookedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', BookingSchema);
