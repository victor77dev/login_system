import axios from 'axios';

var apiUrl = 'http://localhost:4000';

const registerEmailValidate = (values /*, dispatch */) => {
  return axios.get(apiUrl + '/api/checkEmail', {params: {email: values.email}}, {withCredentials: true})
    .then((response) => {
      if (!response.data.available)
        // Throwing error will be incompatible with ESLint rules
        // Warning will be found (Expected an object to be thrown  no-throw-literal)
        // Therefore Promise reject is used instead
        // throw { email: 'That email is already used' };
        return Promise.reject({ email: 'That email is already used' });
    });
}

export default registerEmailValidate;