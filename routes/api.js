var express = require('express');
var router = express.Router();
// Handle file uploads
var multer = require('multer');
var upload = multer({dest:'./uploads'})
// Login auth using passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Using mongoose model
var User = require('../models/user');

var config = require('../config');
// Using Jwt for auth
const jwt = require('jsonwebtoken');

router.get('/checkEmail', function(req, res) {
  User.getUserByEmail(req.query.email, function(err, user) {
    if (user != null)
      res.send({available: false, error: 'Email already used'});
    else
      res.send({available: true});
  });
});

router.get('/user', authenticated, function(req, res, next) {
  let user = {
    name: req.user.name,
    email: req.user.email,
    username: req.user.username,
    profileImage: req.user.profileImage
  };
  let responseJson = res.locals.responseJson;
  let userInfo = {login: true};
  responseJson.login = true;
  responseJson.user = user;
  res.send(responseJson);
});

function authenticated(req, res, next) {
  // Check token for authenticated if token exists
  if (!req.headers.authorization)
    return res.send({login: false, error: 'No token found'});
  const token = req.headers.authorization.split(' ')[1];
  return jwt.verify(token, config.jwt.jwtSecret, (err, decoded) => {
    if (err) return res.send({login: false, error: 'Token invalid, ' + err});

    const userId = decoded.sub;
    User.getUserById(userId, function(err, user) {
      if (err) return res.send({login: false, error: 'User not found'});
      req.user = user;
      const payload = {
        sub: userId
      };
      const token = jwt.sign(payload, config.jwt.jwtSecret, { expiresIn: config.jwt.sessionTime });
      res.locals.responseJson = {};
      res.locals.responseJson.token = token;
      return next();
    });
  });
}

// Configure Strategy for passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
  },
  function(req, email, password, done) {
    // Check user exists
    User.getUserByEmail(email, function(err, user) {
      if (err) return done(err);
      if (!user) {
        return done(null, false, {message: 'Unknown User'});
      }
      // Validate password
      User.comparePassword(password, user.password, function(err, isMatch) {
        if (err) return done(err);
        if (isMatch) {
          const payload = {
            sub: user.id
          };
          const token = jwt.sign(payload, config.jwt.jwtSecret, { expiresIn: config.jwt.sessionTime });
          return done(null, token, user);
        } else {
          return done(null, false, {message: 'Invalid Password'});
        }
      });
    });
  })
);

// Adding login using passport auth
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, token, user, info) {
    if (err) return next(err);
    // Failed authentication
    if (!token || !user) {
      console.log('failed to login')
      return res.send({login: false, error: 'Invalid username or password'});
    }
    console.log('login success')
    let tempUser = {
      name: user.name,
      email: user.email,
      username: user.username,
      profileImage: user.profileImage
    };
    let userInfo = {login: true};
    userInfo.user = tempUser;
    userInfo.token = token;
    return res.send(userInfo);
  })(req, res, next);
});

router.post('/register', function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;
  var profileImage = req.body.profileImage;
  if (req.file) {
    console.log('Uploading file');
    var profileImage = req.file.filename;
  } else {
    console.log('No file uploaded. Use default.');
    var profileImage = 'default.jpg';
  }

  // Form Validator
  req.checkBody('name', 'Name field is required.').notEmpty();
  req.checkBody('email', 'Email field is required.').notEmpty();
  req.checkBody('email', 'Email is invalid.').isEmail();
  req.checkBody('email', 'Email is already in use.').custom(value => {
    return new Promise(function(resolve, reject) {
      User.getUserByEmail(value, function(err, user) {
        if (user != null)
          reject('Email already used');
        else resolve();
      });
    });
  });
  req.checkBody('username', 'Username field is required.').notEmpty();
  req.checkBody('password', 'Password field is required.').notEmpty();
  req.checkBody('password', 'Password should be at least 6 chars long.').isLength({min: 6});
  req.checkBody('confirmPassword', 'Password does not match.').equals(password);

  // Check Errors
  var errors = req.asyncValidationErrors().then(() => {
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
      profileImage: profileImage
    });

    User.createUser(newUser, function(err, user) {
      if (err) throw err;
      console.log(user);
    });

    res.status(200).json({
      success: true,
      message: 'You are now registered and can login'
    });
  }).catch((errors) => {
    var registerPost = req.body;
    res.status(200).json({
      success: false,
      errors: errors,
    });
  });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.send({login: false});
});

module.exports = router;