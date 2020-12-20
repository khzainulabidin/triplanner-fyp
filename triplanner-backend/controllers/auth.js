const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middlewares/asyncHandler');
const User = require('../models/User');
const sendMail = require('../utils/sendEmail');
const crypto = require('crypto');

// @desc    Register a user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
    const {email, password, name, username, accountType} = req.body;

    const confirmationToken = crypto.randomBytes(20).toString('hex');
    const confirmationUrl = `${req.protocol}://${req.get('host')}/api/v1/verifyEmail/${email}/${confirmationToken}`;
    const message = `Thanks for signing up! Clicking on the following link to confirm your email\n\n${confirmationUrl}`;

    try {
        await sendMail({
            email: email,
            subject: 'Confirm your email',
            message,
        });
    }
    catch (err){
        console.log(err.message);
    }

    const user = await User.create({
        email,
        password,
        name,
        username,
        accountType,
        confirmationToken
    });

    sendTokenResponse(user, 200, res);
});

// @desc    Login a user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password){
        return next(new ErrorResponse('Provide an email and password', 400));
    }

    const user = await User.findOne({email}).select('+password');
    if (!user){
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch){
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
        httpOnly: true,
    };
    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });
}

// @desc    Get current logged in user
// @route   POST /api/v1/auth/login
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        data: user
    })
})

// @desc    Update user details
// @route   PUT /api/v1/auth/updateUser
// @access  Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
    const fieldsToUpdate = {
        interests: req.body.interests
    }

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        data: user
    })
});