const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email required'],
        unique: [true, 'Email already in use'],
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        minlength: 8,
        select: false,
    },
    username: {
        type: String,
        required: [true, 'Username required'],
        unique: [true, 'Username already in use'],
        minlength: 4,
    },
    name: {
        type: String,
        required: [true, 'Name required'],
    },
    accountType: {
        type: String,
        enum: ['tourist', 'business'],
        default: 'tourist',
        required: [true, 'Account type required'],
    },
    avatar: {
        type: String,
        default: 'avatar.png',
    },
    gender: {
        type: String,
    },
    dob: {
        type: Date,
    },
    interests: [String],
    confirmed: {
        type: Boolean,
        default: false
    },
    confirmationToken: {
        type: String,
        required: [true, 'Email cannot be confirmed'],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getSignedJwtToken = function (){
    return jwt.sign(
        {id: this._id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRE}
        )
}

UserSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);