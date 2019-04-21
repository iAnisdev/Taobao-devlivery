var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var orderRouter = require('./routes/order');

/* database setup */
var db = require('./config/database')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/Api/v1/', indexRouter);
app.use('/Api/v1/users', usersRouter);
app.use('/Api/v1/order', orderRouter);

module.exports = app;
