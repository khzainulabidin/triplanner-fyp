const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User');

exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token){
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    }
    catch (err){
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
});

exports.authorize = (...accountTypes) => {
    return (req, res, next) => {
        if (!accountTypes.includes(req.user.accountType)){
            return next(
                new ErrorResponse(`Account type ${req.user.accountType} is not authorized to access this route`, 403)
            )
        }
        next();
    }
}