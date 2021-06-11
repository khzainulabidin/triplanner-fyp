const Booking = require('../models/Booking');
const stripe = require("stripe")("sk_test_51J0lIlKPY5YHguOZze9bXQPEFDnxPOWiF2GfSyHrSHw7ziDTnK6palsWSRLf6umwEticSOCLLRT1eeCEiKiKjRig00bKKXx7Tg");

exports.createPaymentIntent = async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.paymentTotal,
            currency: "pkr"
        });

        res.send({
            success: true,
            data: paymentIntent.client_secret
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Unable to create payment intent'
        });
    }
}

exports.refundPayment = async (req, res) => {
    try {
        const refund = await stripe.refunds.create({
            payment_intent: req.body.paymentId,
            amount: req.body.amount
        });

        if (refund.status !== 'succeeded'){
            return res.send({
                success: false,
                data: 'Unable to refund payment'
            });
        }

        await Booking.findOneAndUpdate(
            {_id: req.body.bookingId},
            {refund},
            {new: true, runValidators: true}
        );

        res.send({
            success: true,
            data: refund
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Unable to refund payment'
        });
    }
}

exports.getBookings = async (req, res) => {
    try {
        const filter = req.body.type === 'business' ? {hotelId: req._id} : {customerId: req._id};
        const bookings = await Booking.find(filter);
        if (!bookings){
            return res.send({
                success: true,
                data: []
            });
        }

        res.send({
            success: true,
            data: bookings
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Unable to get bookings'
        });
    }
}

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({});
        if (!bookings){
            return res.send({
                success: true,
                data: []
            });
        }

        res.send({
            success: true,
            data: bookings
        });
    }
    catch (e){
        res.send({
            success: true,
            data: []
        });
    }
}

exports.deleteBooking = async (req, res) => {
    try {
        const {id} = req.params;
        const booking = await Booking.findOneAndDelete({_id: id});
        if (!booking){
            return res.send({
                success: false,
                data: 'Unable to delete booking'
            })
        }

        res.send({
            success: true,
            data: 'Booking deleted successfully'
        })
    }
    catch (e){
        res.send({
            success: false,
            data: 'Unable to delete booking'
        })
    }
}

exports.getBooking = async (req, res) => {
    try {
        const booking = await Booking.findOne({_id: req.params.id});
        if (!booking){
            return res.send({
                success: false,
                data: 'No booking found'
            });
        }

        res.send({
            success: true,
            data: booking
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'No booking found'
        });
    }
}
