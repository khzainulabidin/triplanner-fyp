const asyncHandler = require('../middlewares/asyncHandler');
const Review = require('../models/Review');

exports.addReview = asyncHandler(async (req, res, next) => {
    const {user_id, place_id, review, rating, recommended} = req.body;
    const reviewResult = await Review.create({
        place_id,
        user_id,
        review,
        rating,
        recommended,
    });
    res.status(200).json({
        success: true,
        data: reviewResult
    })
})

exports.getReview = (req, res, next) => {
    const reviews = Review.find({place_id: req.params.place_id}, ((err, docs) => {
        res.status(200).json({
            success: true,
            data: reviews,
        })
    }))
}