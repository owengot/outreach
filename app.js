var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(require("body-parser").urlencoded({extended: false}));

const keyPublishable = "pk_test_51Hv4VPFkCQi6gy8wWToK70luIgge0vD9mo40Q6Fge0hyV55L7l3n3iXJ5gAtyHzq5BEXAy5FyCtim27G1CxJvCqg00q6mnMLyh";
const keySecret = "sk_test_51Hv4VPFkCQi6gy8wMgkOVAhkeMAt1J17PY4XWkGDCJdSmzMyresHkWo3nz6AiatwXWJFdqRo7sIfoCILlyiIbOWy00CR1LVWcR";

const stripe = require("stripe")(keySecret);

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
