const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');
const axios = require('axios');

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

    const url = `${process.env.GOOGLE_MAPS_BASE_URL}?${key}&${location}&${radius}&${keyword}&type=`;
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

app.get('/api/v1/verifyEmail/:email/:token', ((req, res) => {
    console.log(req.params.email);
    console.log(req.params.token);
}))

app.use(errorHandler);
module.exports = app;
