const Review = require('../models/Review');
const {isValidString} = require('../utils/regex');

exports.submitReview = async (req, res) => {
    try {
        const {itemId, rating, review, name} = req.body;

        if (review === '' || !isValidString(review)){
            return res.send({
                success: false,
                data: 'Please enter a valid review'
            });
        }

        const reviewExist = await Review.findOne({itemId: itemId, userId: req._id});
        if (reviewExist){
            return res.send({
                success: false,
                data: 'You have already reviewed this place'
            });
        }

        const submittedReview = await Review.create({
            itemId,
            userId: req._id,
            rating,
            review,
            name
        });

        if (!submittedReview){
            return res.send({
                success: false,
                data: 'Unable to submit review'
            });
        }


        res.send({
            success: true,
            data: 'Review submitted successfully'
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Unable to submit review'
        });
    }
}

exports.getReviews = async (req, res) => {
    try {
        const {itemId} = req.params;
        const reviews = await Review.find({itemId});
        res.send({
            success: true,
            data: reviews
        })
    }
    catch (e){
        res.send({
            success: false,
            data: 'Unable to get reviews'
        });
    }
}

exports.getUserReviews = async (req, res) => {
    try {
        const reviews = await Review.find({userId: req._id});
        res.send({
            success: true,
            data: reviews
        })
    }
    catch (e){
        res.send({
            success: false,
            data: 'Unable to get reviews'
        });
    }
}


exports.deleteReview = async (req, res) => {
    try {
        const reviews = await Review.findOneAndDelete({userId: req._id, itemId: req.params.itemId});
        if (!reviews){
            return res.send({
                success: false,
                data: 'Unable to delete review'
            });
        }

        res.send({
            success: true,
            data: 'Review deleted successfully'
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Unable to delete review'
        });
    }
}

exports.getRating = async (req, res) => {
    try {
        const reviews = await Review.find({itemId: req.params.itemId});

        let totalRating = 0;
        for (let i=0; i<reviews.length; i++){
            totalRating += Number(reviews[i].rating);
        }
        let finalRating = totalRating/reviews.length;
        if (finalRating > 0){
            finalRating = finalRating.toFixed(1);
        }
        else {
            finalRating = 0;
        }

        res.send({
            success: true,
            data: finalRating
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 0
        });
    }
}
