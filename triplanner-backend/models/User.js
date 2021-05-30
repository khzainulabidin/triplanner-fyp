const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    password: {
        type: String,
        select: false,
    },
    username: String,
    accountType: String,
    avatar: String,
    cover: String,
    confirmed: {
        type: Boolean,
        default: false
    },
    confirmationToken: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    isBanned: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);
