const Business = require('../models/Business');
const asyncHandler = require('../middlewares/asyncHandler');

exports.saveBusinessDetails = asyncHandler(async (req, res, next) => {
    const {name, rating, phone, liveChatFeature, address, city, zip} = req.body;
    const business = await Business.create({
        user_id: req.user.id,
        businessName: name,
        starRating: rating,
        phone: phone,
        chatFeature: liveChatFeature,
        streetAddress: address,
        city: city,
        zipCode: zip,
    });

    res.status(200).json({
        success: true,
        data: business
    })
});

exports.saveRoomsInfo = asyncHandler(async (req, res, next) => {
    const fieldsToUpdate = {
        rooms: req.body.rooms
    }

    const business = await Business.findOneAndUpdate({user_id: req.user.id}, fieldsToUpdate, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        data: business
    })
});

exports.saveHotelFacilities = asyncHandler(async (req, res, next) => {
    const fieldsToUpdate = {
        facilities: req.body.facilities,
        checkin: req.body.checkin,
        checkout: req.body.checkout
    }

    const business = await Business.findOneAndUpdate({user_id: req.user.id}, fieldsToUpdate, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        data: business
    })
})