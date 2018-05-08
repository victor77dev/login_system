var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')

let config = require('../config.json');
let dbPath = config.db.basePath;
dbPath = dbPath.replace('dbUser', process.env[config.db.dbUser]);
dbPath = dbPath.replace('dbPassword', process.env[config.db.dbPassword]);
console.log(dbPath);

mongoose.connect(dbPath);

var db = mongoose.connection;

// User Schema
var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  name: {
    type: String
  },
  profileImage: {
    type: String
  }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
  let query = {username: username};
  User.findOne(query, callback);
}

module.exports.getUserByEmail = function(email, callback) {
  let query = {email: email};
  User.findOne(query, callback);
}

module.exports.comparePassword = function(password, hash, callback) {
  bcrypt.compare(password, hash, function(err, res) {
    callback(null, res)
  });
}

module.exports.createUser = function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}