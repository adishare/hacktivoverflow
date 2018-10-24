require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose');

const app = express();

// mongoose.connect("mongodb://localhost:27017/h8overfly",{ useNewUrlParser: true });
mongoose.connect("mongodb://h8overfly:h8overfly@ds055680.mlab.com:55680/h8overfly",{ useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console,'connection error:'));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index.js'));

module.exports = app;
