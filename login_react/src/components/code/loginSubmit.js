import { SubmissionError } from 'redux-form';
import axios from 'axios';

import { registered } from '../../actions/registerActions'

let config = require('../../config.json')
var apiUrl = config.server.basePath;

function loginSubmit(values, dispatch, props) {
  dispatch(registered(''));
  return axios.post(apiUrl + '/api/login', values, {withCredentials: true})
    .then((response) => {
      if (!response.data.login) {
        throw response.data;
      } else {
        props.history.push('/');
      }
    })
    .catch((err) => {
      let errorMsg = {};
      if (err.login !== undefined)
        errorMsg._error = err.error;
      else
        errorMsg._error = 'Server Error!';
      throw new SubmissionError(errorMsg);
    });
}

export default loginSubmit;