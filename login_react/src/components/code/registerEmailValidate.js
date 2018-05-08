import axios from 'axios';

let config = require('../../config.json')
var apiUrl = config.server.basePath;

const registerEmailValidate = (values, dispatch) => {
  return axios.get(apiUrl + '/api/checkEmail', {params: {email: values.email}}, {withCredentials: true})
    .then((response) => {
      if (!response.data.available)
        // Throwing error will be incompatible with ESLint rules
        // Warning will be found (Expected an object to be thrown  no-throw-literal)
        // Therefore return object and return null for success instead
        // throw { email: 'That email is already used' };
        return { email: 'That email is already used', _error: 'Please use another email for registration' };
      else {
        return null;
      }
    })
    .catch((err)=> {
      return { email: 'Cannot connect to server. Unable to check.', _error: 'Server Error!' };
    });
}

export default registerEmailValidate;