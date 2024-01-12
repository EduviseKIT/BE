var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
// const cors = require("cors");

// --------------------------- 라우터 경로 ---------------------
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testsRouter = require('./routes/test');
var aitestsRouter = require('./routes/aitest');
var posttestRouter = require('./routes/posttest');
var aiResultRouter = require('./routes/aiResult');
// ------------------------------------------------------

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors());

// --------------------------- 라우터 ---------------------

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testsRouter);
app.use('/aitest', aitestsRouter);
app.use('/posttest', posttestRouter);
app.use('/api', aiResultRouter);

//--------------------------------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
