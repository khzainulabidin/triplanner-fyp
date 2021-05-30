const {isValidEmail, isValidPassword, isValidUsername, isValidName} = require('../utils/regex');
const User = require('../models/User');
const Tourist = require('../models/Tourist');
const Business = require('../models/Business');
const Booking = require('../models/Booking');
const Trip = require('../models/Trip');
const bcrypt = require('bcryptjs');
const sendMail = require('../utils/sendEmail');
const crypto = require('crypto');
const encryption = require('../utils/encryption');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const {email, password, username} = req.body;
        validateBasicCredentials(email, password, res);
        if (username === '' || !isValidUsername(username)){
            return res.send({
                success: false,
                data: 'Invalid username'
            });
        }

        const emailExists = await User.findOne({email: email});
        if (emailExists){
            return res.send({
                success: false,
                data: 'Email already exists'
            });
        }

        const usernameExists = await User.findOne({username: username});
        if (usernameExists){
            return res.send({
                success: false,
                data: 'Username already exists'
            });
        }

        const encryptedEmail = encryption.encrypt(email);
        const confirmationToken = crypto.randomBytes(20).toString('hex');
        const confirmationUrl = `${process.env.EMAIL_VERIFICATION_LINK}/${encryptedEmail.iv}/${encryptedEmail.content}/${confirmationToken}`;
        const message = `Hi ${username},\n\nThanks for signing up! Please verify your email address by clicking the following link:\n\n${confirmationUrl}`;

        const emailSent = await sendMail({
            email,
            subject: 'Verify your email address',
            message,
        });

        if (!emailSent){
            return res.send({
                success: false,
                data: 'Unable to verify email address'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
            confirmationToken
        });

        const token = getToken(user._id);
        res.send({
            success: true,
            data: token
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Cannot connect to the server'
        });
    }
}

exports.verifyEmail = async (req, res) => {
    try {
        const {iv, content, token} = req.params;
        const email = encryption.decrypt({iv, content});

        const isAlreadyVerified = await User.findOne({email: email, confirmed: true});
        if (isAlreadyVerified){
            return res.send({
                success: false,
                data: 'Email address is already verified'
            });
        }

        const isVerified = await User.findOneAndUpdate(
            {email: email, confirmationToken: token, confirmed: false},
            {confirmed: true},
            {runValidators: true, new: true}
        );

        if (!isVerified){
            return res.send({
                success: false,
                data: 'Cannot verify email address'
            });
        }

        res.send({
            success: true,
            data: 'Email verified successfully'
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Cannot connect to the server'
        });
    }
}

exports.signIn = async (req, res) => {
    try {
        const {email, password} = req.body;
        validateBasicCredentials(email, password, res);

        const user = await User.findOne({email}).select('+password');
        if (!user){
            return res.send({
                success: false,
                data: 'Incorrect email or password',
            });
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword){
            return res.send({
                success: false,
                data: 'Incorrect email or password',
            });
        }

        const token = getToken(user._id);
        res.send({
            success: true,
            data: token
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Cannot connect to the server'
        });
    }
}

exports.accountInfo = async (req, res) => {
    try{
        const {name, accountType} = req.body;
        if (name === '' || !isValidName(name)){
            return res.send({
                success: false,
                data: 'Invalid name',
            });
        }
        if (accountType === ''){
            return res.send({
                success: false,
                data: 'Invalid account type',
            });
        }

        const user = await User.findByIdAndUpdate({_id: req._id}, {accountType}, {
            new: true,
            runValidators: true
        });
        if (!user){
            return res.send({
                success: false,
                data: 'Cannot update account information',
            });
        }

        let account;
        if (accountType === 'tourist'){
            account = await Tourist.create({
                userId: req._id,
                name
            });
        }
        else if (accountType === 'business'){
            account = await Business.create({
                userId: req._id,
                name
            });
        }

        if (!account){
            return res.send({
                success: false,
                data: 'Cannot update account information',
            });
        }

        res.send({
            success: true,
            data: 'Account updated successfully',
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Cannot connect to the server',
        });
    }
}

exports.getMe = async (req, res) => {
    await getProfile(req, res, req._id);
}

exports.getOtherProfile = async (req, res) => {
    await getProfile(req, res, req.params.userId);
}

exports.getProfileByUsername = async (req, res) => {
    await getProfile(req, res, req.params.username, 'username');
}

exports.uploadPhoto = async (req, res) => {
    try {
        let user, business;
        const path = req.file.path.replace("public\\", '');
        if (req.body.type === 'avatar'){
            user = await User.findByIdAndUpdate({_id: req._id}, {avatar: path}, {
                new: true,
                runValidators: true,
            });
        }
        else if (req.body.type === 'cover'){
            user = await User.findByIdAndUpdate({_id: req._id}, {cover: path}, {
                new: true,
                runValidators: true,
            });
        }
        else if (req.body.type === 'roomGallery'){
            business = await Business.findOne({userId: req._id});
            const existingGallery = business.roomGallery;
            const updatedGallery = [...existingGallery, path];

            user = await Business.findOneAndUpdate({userId: req._id}, {roomGallery: updatedGallery}, {
                new: true,
                runValidators: true,
            });
        }

        if (!user){
            return res.send({
                success: false,
                data: 'Cannot upload photo',
            });
        }

        res.send({
            success: true,
            data: 'Photo uploaded successfully'
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Cannot connect to the server',
        });
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({_id: req._id});
        if (!user){
            return res.send({
                success: false,
                data: 'Unable to delete user'
            });
        }

        let account;
        if (req.body.type === 'business'){
            account = await Business.findOneAndDelete({userId: req._id});
        }
        else if (req.body.type === 'tourist'){
            account = await Tourist.findOneAndDelete({userId: req._id});
            await Booking.deleteMany({customerId: req._id});
            await Trip.deleteMany({userId: req._id});
        }

        if (!account){
            return res.send({
                success: false,
                data: 'Unable to delete account'
            });
        }

        res.send({
            success: true,
            data: 'Account deleted successfully'
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Cannot connect to the server',
        });
    }
}

exports.getUser = async (req, res) => {
    try {
        const {userId, type} = req.params;
        if (userId === '' || userId === undefined || userId === null){
            return res.send({
                success: false,
                data: 'Provide a valid user id'
            });
        }

        let user;
        if (type === 'id'){
            user = await User.findOne({_id: userId});
        }
        else if (type === 'username'){
            user = await User.findOne({username: userId});
        }

        if (!user){
            return res.send({
                success: false,
                data: 'No user exist'
            });
        }

        res.send({
            success: true,
            data: user
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Unable to find user'
        });
    }
}

const getToken = _id => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
}

const validateBasicCredentials = (email, password, res) => {
    if (email === '' || !isValidEmail(email)){
        return res.send({
            success: false,
            data: 'Invalid email address'
        });
    }
    if (password === '' || !isValidPassword(password)){
        return res.send({
            success: false,
            data: 'Invalid password'
        });
    }
}


const getProfile = async (req, res, id, type) => {
    try {
        let user;

        if (type === 'username'){
            user = await User.findOne({username: id});
        }
        else {
            user = await User.findOne({_id: id});
        }

        if (!user){
            return res.send({
                success: false,
                data: 'Cannot find user'
            });
        }

        let account;
        if (user.accountType === 'tourist'){
            account = await Tourist.findOne({userId: user._id});
        }
        else if (user.accountType === 'business'){
            account = await Business.findOne({userId: user._id});
        }
        if (!account){
            return res.send({
                success: true,
                data: user
            });
        }

        res.send({
            success: true,
            data: {user: user, account: account}
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Cannot connect to the server',
        });
    }
}

exports.getUsers = async (req, res) => {
    try {
        let usersData = [];

        const users = await User.find({});
        if (!users){
            return res.send({
                success: true,
                data: []
            });
        }

        for (let i=0; i<users.length; i++){
            let account = null;
            if (users[i].accountType === 'tourist'){
                account = await Tourist.findOne({userId: users[i]._id});
            }
            else if (users[i].accountType === 'business'){
                account = await Business.findOne({userId: users[i]._id});
            }
            if (account){
                usersData.push({user: users[i], account: account});
            }
        }

        res.send({
            success: true,
            data: usersData
        });
    }
    catch (e){
        res.send({
            success: true,
            data: []
        });
    }
}

exports.banUser = async (req, res) => {
    try {
        const {id, update} = req.body;
        const banStatus = update === 'ban';
        const user = await User.findOneAndUpdate({_id: id}, {isBanned: banStatus}, {new: true, runValidators: true});
        if (!user){
            return res.send({
                success: false,
                data: 'Unable to update user',
            });
        }

        res.send({
            success: true,
            data: user
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Unable to update user',
        });
    }
}


exports.deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findOne({_id: id});
        if (!user){
            return res.send({
                success: false,
                data: 'Unable to delete user',
            });
        }

        const isDeleted = await User.findOneAndDelete({_id: id});
        if (!isDeleted){
            return res.send({
                success: false,
                data: 'Unable to delete user',
            });
        }

        if (user.accountType === 'tourist'){
            await Tourist.findOneAndDelete({userId: id});
            await Booking.deleteMany({customerId: id});
            await Trip.deleteMany({userId: id});
        }
        else if (user.accountType === 'business'){
            await Business.findOneAndDelete({userId: id});
        }

        res.send({
            success: true,
            data: 'User deleted successfully'
        });
    }
    catch (e){
        res.send({
            success: false,
            data: 'Unable to update user',
        });
    }
}

exports.getUsersByCity = async (req, res) => {
    try {
        const users = await Tourist.find({city: req.params.city});
        if (!users){
            return res.send({
                success: true,
                data: []
            })
        }

        res.send({
            success: true,
            data: users
        })
    }
    catch (e){
        res.send({
            success: true,
            data: []
        })
    }
}

exports.getFriendTrips = async (req, res) => {
    try {
        const user = await Tourist.findOne({userId: req.params.id});
        const filteredFriends = user.friends.filter(friend => friend.status === 'Accepted');
        const filteredRequests = user.friendRequests.filter(friend => friend.status === 'Accepted');
        const friends = [...filteredFriends, ...filteredRequests];
        let trips = [];
        if (friends.length > 0){
            for (let i=0; i<friends.length; i++){
                const friendId = await User.findOne({username: friends[i].username});
                const userTrips = await Trip.find({userId: friendId._id, $or: [{privacy: 'public'}, {privacy: 'friends'}]});
                if (userTrips){
                    trips = [...trips, {trips: userTrips, username: friends[i].username}];
                }
            }
        }
        res.send({
            success: true,
            data: trips
        });
    }
    catch (e){
        return res.send({
            success: false,
            data: 'Unable to fetch friends trips'
        })
    }
}
