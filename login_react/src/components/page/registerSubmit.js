import { SubmissionError } from 'redux-form';
import axios from 'axios';

import { registered } from '../../actions/registerActions'

var apiUrl = 'http://localhost:4000';

export default function registerSubmit(values, dispatch, props) {
  return axios.post(apiUrl + '/api/register', values)
    .then((response) => {
      if (!response.data.success)
        throw response.data;
      else {
        dispatch(registered('You have registered sucessfully'));
        props.history.push('/login');
      }
    })
    .catch((err) => {
      let errorMsg = {};
      if (err.success !== undefined) {
        err.errors.forEach(function(error) {
          errorMsg[error.param] = error.msg;
        });
        errorMsg._error = 'Fail to register!'
      } else
        errorMsg._error = 'Server Error!'
      throw new SubmissionError(errorMsg);
    });
}