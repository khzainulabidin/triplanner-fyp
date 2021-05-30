const Booking = require('../models/Booking');

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
