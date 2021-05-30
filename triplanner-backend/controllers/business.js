const Business = require('../models/Business');
const Booking = require('../models/Booking');
const {isValidPhone, isValidRating, isValidAddress, isValidZipCode} = require('../utils/regex');

exports.updateProfile = async (req, res) => {
    const {phone, starRating, address, city, zipCode} = req.body;
    if (phone === '' || !isValidPhone(phone)){
        return res.send({
            success: false,
            data: 'Invalid phone number',
        });
    }
    if (starRating === '' || !isValidRating(starRating) || starRating < 1 || starRating > 10){
        return res.send({
            success: false,
            data: 'Invalid rating',
        });
    }
    if (address === '' || !isValidAddress(address)){
        return res.send({
            success: false,
            data: 'Invalid address',
        });
    }
    if (city === ''){
        return res.send({
            success: false,
            data: 'Invalid city',
        });
    }
    if (zipCode === '' || !isValidZipCode(zipCode)){
        return res.send({
            success: false,
            data: 'Invalid zip code',
        });
    }

    await updateBusiness(req, res, {phone, starRating, address, city, zipCode}, 'Profile');
}

exports.updateFacilities = async (req, res) => {
    const {facilities} = req.body;
    await updateBusiness(req, res, {facilities}, 'Facilities');
}

exports.updateRooms = async (req, res) => {
    const {rooms, availableTypes, newRoom} = req.body;
    const newlyAddedRooms = newRoom.number_of_rooms;
    await updateBusiness(req, res,
        {rooms, availableTypes, $inc: {
            totalRooms: req.body.action === 'add' ? newlyAddedRooms : -newlyAddedRooms,
            availableRooms: req.body.action === 'add' ? newlyAddedRooms : -newlyAddedRooms
        }},
        'Rooms'
    );
}

exports.updateRoom = async (req, res) => {
    try {
        const {type, number_of_rooms} = req.body;
        const room = await Business.findOneAndUpdate(
            {userId: req._id, 'rooms.type': type},
            {$set: {'rooms.$.number_of_rooms': number_of_rooms}},
            {new: true, runValidators: true}
        );
        if (!room){
            return res.send({
                success: false,
                data: 'Unable to update room'
            });
        }
        const business = await Business.findOneAndUpdate(
            {userId: req._id},
            {$inc: {
                totalRooms: req.body.action === 'inc' ? 1 : -1, availableRooms: req.body.action === 'inc' ? 1 : -1
            }},
            {new: true, runValidators: true}
        );
        if (!business){
            return res.send({
                success: false,
                data: 'Unable to update room'
            });
        }

        res.send({
            success: true,
            data: 'Room updated successfully'
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Cannot connect to the server'
        });
    }
}

exports.deleteGalleryPhoto = async (req, res) => {
    try {
        const business = await Business.findOne({userId: req._id});
        const existingGallery = business.roomGallery;
        const updatedGallery = existingGallery.filter(photo => photo !== req.body.photo);

        const updatedBusiness = await Business.findOneAndUpdate({userId: req._id}, {roomGallery: updatedGallery}, {
            new: true,
            runValidators: true
        });

        if (!updatedBusiness){
            return res.send({
                success: false,
                data: `Unable to delete photo`,
            });
        }

        res.send({
            success: true,
            data: updatedBusiness.roomGallery,
        });
    }
    catch (e){
        res.send({
            success: false,
            data: `Unable to delete photo`,
        });
    }
}

exports.updateMessaging = async (req, res) => {
    await updateBusiness(req, res, {messaging: req.body.messaging}, 'Messaging');
}

exports.checkoutBooking = async (req, res) => {
    const booking = await Booking.findOneAndUpdate(
        {_id: req.body.id},
        {status: req.body.statusUpdate},
        {new: true, runValidators: true}
    );

    if (!booking){
        return res.send({
            success: false,
            data: 'Unable to update booking'
        });
    }

    const business = await Business.findOneAndUpdate(
        {userId: req.body.hotelId ? req.body.hotelId : req._id, 'rooms.type': booking.roomType},
        {$inc: {'rooms.$.number_of_rooms': 1}},
        {new: true, runValidators: true}
    );

    if (!business){
        return res.send({
            success: false,
            date: 'Unable to update business'
        });
    }

    res.send({
        success: true,
        data: booking
    });
}

exports.getBusinessesByLocation = async (req, res) => {
    await getBusiness(req, res, {city: {'$regex': req.params.location, '$options': 'i'}, 'rooms.0': { '$exists': true }});
}

exports.bookRoom = async (req, res) => {
    const {booking, hotelId} = req.body;

    const room = await Business.findOneAndUpdate(
        {userId: hotelId, 'rooms.type': booking.roomType},
        {$inc: {'rooms.$.number_of_rooms': -1}},
        {new: true, runValidators: true}
    );

    if (!room){
        return res.send({
            success: false,
            data: 'Unable to book room'
        });
    }

    const bookingOnServer = await Booking.create({
        ...booking,
        customerId: req._id,
        hotelId
    });

    if (!bookingOnServer){
        return res.send({
            success: false,
            data: 'Room cannot be booked at this time'
        });
    }

    res.send({
        success: true,
        data: bookingOnServer
    });
}

const updateArray = async (req, res, update, errMsg, successMsg) => {
    try{
        const business = await Business.findOneAndUpdate(
            {userId: req.body.hotelId},
            {$push: update},
            {new: true, runValidators: true});
        if (!business){
            return res.send({
                success: false,
                data: errMsg
            });
        }

        res.send({
            success: true,
            data: successMsg
        });
    }
    catch (e){
        return res.send({
            success: false,
            data: errMsg
        });
    }
}

const getBusiness = async (req, res, filter) => {
    try {
        const businesses = await Business.find(filter);
        if (!businesses){
            return res.send({
                success: false,
                data: `No results found`,
            });
        }

        res.send({
            success: true,
            data: businesses,
        });
    }
    catch (e){
        res.send({
            success: false,
            data: `Unable to fetch businesses`,
        });
    }
}

const updateBusiness = async (req, res, update, type) => {
    try {
        const business = await Business.findOneAndUpdate(
            {userId: req._id},
            update,
            {new: true, runValidators: true}
        );
        if (!business){
            return res.send({
                success: false,
                data: `Unable to update ${type}`,
            });
        }

        res.send({
            success: true,
            data: `${type} updated successfully`,
        });
    }
    catch (e){
        res.send({
            success: false,
            data: `Unable to update ${type}`,
        });
    }
}
