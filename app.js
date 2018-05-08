var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var expressValidator = require('express-validator');
var session = require('express-session');

var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;

var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Handle Express Sessions
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Init Passport
app.use(passport.initialize());
app.use(passport.session());

// Express Validator (copy from usage)
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res, next) {
  res.locals.user = req.user || null;
  next();
})

// Allow Cross-Origin Resource Sharing (CORS)
app.use(function(req, res, next) {
  let clientUrl = "http://localhost:3000";
  res.header("Access-Control-Allow-Origin", clientUrl);
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use('/', index);
app.use('/users', users);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
