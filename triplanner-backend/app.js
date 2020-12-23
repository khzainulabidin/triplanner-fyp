const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');
const axios = require('axios');
const encryption = require('./utils/encryption');
const User = require('./models/User');
const asyncHandler = require('./middlewares/asyncHandler');
const Review = require('./models/Review');

dotenv.config({path: './config/config.env'});

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app = express();
connectDB();

if (process.env.NODE_ENV === 'development'){
    app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);

app.post('/nearbyPlacesProxy', (req, res) => {
    const key = `key=${process.env.GOOGLE_MAPS_API_KEY}`;
    const location = `location=${req.body.latitude},${req.body.longitude}`;
    const radius = `radius=${req.body.radius}`;
    const keyword = `keyword=${req.body.keyword}`;

    const url = `${process.env.GOOGLE_MAPS_BASE_URL}${process.env.GOOGLE_MAPS_NEARBY_ROUTE}?${key}&${location}&${radius}&${keyword}&type=`;
    const api = axios.create({
        baseURL: url
    });

    api.get('/').then(response => {
        res.send({
            success: true,
            response: response.data.results,
        });
    }).catch(err => console.log(err.message));
});

app.post('/placeDetailsProxy', ((req, res) => {
    const key = `key=${process.env.GOOGLE_MAPS_API_KEY}`;
    const place_id = `place_id=${req.body.place_id}`;

    const url = `${process.env.GOOGLE_MAPS_BASE_URL}${process.env.GOOGLE_MAPS_DETAIL_ROUTE}?${key}&${place_id}&type=`;
    const api = axios.create({
        baseURL: url
    });

    api.get('/').then(response => {
        res.send({
            success: true,
            response: response.data,
        });
    }).catch(err => console.log(err.message));
}));

app.get('/api/v1/verifyEmail/:iv/:content/:token', asyncHandler(async (req, res) => {
    const email = {
        iv: req.params.iv,
        content: req.params.content
    };
    const decryptedEmail = encryption.decrypt(email);
    const token = req.params.token;
    let confirmed;
    let user = await User.findOne({email: decryptedEmail});

    if (user.confirmationToken === token){
        await User.findByIdAndUpdate({_id: user._id}, {confirmed: true}, {
            new: true,
            runValidators: true,
        });

        confirmed = true;

        res.status(200).json({
            success: true,
        })
    }

    if (!confirmed){
        res.status(200).json({
            success: false,
        })
    }
}));

app.post('/api/v1/review', asyncHandler(async (req, res) => {
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
}));

app.get('/api/v1/review/:place_id', ((req, res) => {
    const reviews = Review.find({place_id: req.params.place_id}, ((err, docs) => {
        res.status(200).json({
            success: true,
            data: docs,
        })
    }))
}));

app.use(errorHandler);
module.exports = app;
