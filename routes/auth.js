// Using mongoose model
var User = require('../models/user');
var config = require('../config');
// Using Jwt for auth
const jwt = require('jsonwebtoken');

var authenticated = function(req, res, next) {
  const pathExclude = ['/login', '/register', '/checkEmail'];
  if (pathExclude.includes(req.path))
    return next();
  // Check token for authenticated if token exists
  if (!req.headers.authorization)
    return res.send({login: false, error: 'No token found'});
  const token = req.headers.authorization.split(' ')[1];
  return jwt.verify(token, config.jwt.jwtSecret, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError' && err.message === 'jwt expired')
        return res.send({
          login: false,
          tokenExpired: true,
          error: 'Login seesion timeout. Please login again.(Expiration Time: ' + config.jwt.sessionTime + 's)'
        });
      else
        return res.send({login: false, error: 'Token invalid, ' + err});
    }

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
module.exports = authenticated;