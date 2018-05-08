import { SubmissionError } from 'redux-form'
import axios from 'axios';

import { registered } from '../../actions/registerActions'

var apiUrl = 'http://localhost:4000';

function loginSubmit(values, dispatch, props) {
  dispatch(registered(''));
  console.log(values);
  return axios.post(apiUrl + '/api/login', values, {withCredentials: true})
    .then((response) => {
      if (!response.data.login) {
        throw response.data.error;
      } else {
        props.history.push('/');
      }
    })
    .catch((err) => {
      let errorMsg = {};
      if (err.login !== undefined)
        errorMsg._error = err;
      else
        errorMsg._error = 'Server Error!';
      throw new SubmissionError(errorMsg);
    });
}

export default loginSubmit;