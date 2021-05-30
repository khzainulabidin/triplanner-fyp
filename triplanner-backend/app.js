const express = require('express');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config({path: './.env'});
const connectDB = require('./utils/db');
const cors = require('cors');

const accountRouter = require('./routes/account');
const businessRouter = require('./routes/business');
const touristRouter = require('./routes/tourist');
const proxyRouter = require('./routes/proxy');
const reviewRouter = require('./routes/review');
const bookingRouter = require('./routes/booking');
const messageRouter = require('./routes/message');
const tripRouter = require('./routes/trip');
const discussionGroupRouter = require('./routes/discussionGroup');

connectDB();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'development'){
    app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/account', accountRouter);
app.use('/business', businessRouter);
app.use('/tourist', touristRouter);
app.use('/proxy', proxyRouter);
app.use('/review', reviewRouter);
app.use('/booking', bookingRouter);
app.use('/message', messageRouter);
app.use('/trip', tripRouter);
app.use('/discussionGroup', discussionGroupRouter);

server.listen(port);
