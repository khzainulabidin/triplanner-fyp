const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

dotenv.config({path: './config/config.env'});

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const businessRouter = require('./routes/business');
const proxyRouter = require('./routes/proxy');
const reviewRouter = require('./routes/review');

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
app.use('/api/v1/business', businessRouter);
app.use('/api/v1/proxy', proxyRouter);
app.use('/api/v1/review', reviewRouter);

app.use(errorHandler);
module.exports = app;
