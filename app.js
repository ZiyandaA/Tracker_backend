var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var HTTPError = require('./utils/Errors/HTTPError');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var puppyRouter = require('./routes/puppy');
var authRouter = require('./routes/authentication');
var trackerRouter = require('./routes/tracker');
var findMeRouter = require('./routes/findMe');
var trackerTargetRouter = require('./routes/trackertarget');
var app = express();
var session = require('express-session');
var mongoose = require('mongoose');
var cors = require('cors')
var db_host;
if (process.env.NODE_ENV === "test") {
  db_host = "test";
}
else {
  db_host = "mydb"
}
mongoose.connect('mongodb://localhost/' + db_host);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//middleware

app.use(logger('dev'));
app.use(function(req, res, next) {
  console.log(req.headers.origin, 'origin');
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(session({
  secret: 'ziyanda',
  saveUninitialized: true,
  resave: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/puppys',puppyRouter);
app.use('/auth', authRouter);
app.use('/trackers', trackerRouter);
app.use('/trackertargets', trackerTargetRouter);
app.use('/find-me', findMeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  if (err instanceof HTTPError) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err.message);
    res.status(err.status);
    res.json(err);
  }
  else {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(500);
    console.log(err.message, 'this is message')
    res.send({err: err.message});
  }

});

module.exports = app;
