import axios from 'axios';

let config = require('../config.json')
var apiUrl = config.server.basePath;

export function logined(user) {
  return {
    type: 'LOGIN',
    payload: user
  }
}

export function logouted(error='') {
  return {
    type: 'LOGOUT',
    payload: error
  }
}

export function loading() {
  return {
    type: 'LOADING'
  }
}

export function fetchUserData() {
  return dispatch => {
    dispatch(loading());
    const token = localStorage.getItem('token');
    let authHeader = {};
    if (token)
      authHeader = {
        'Authorization': 'bearer ' + token,
      };
    axios.get(apiUrl + '/api/user', {headers: authHeader})
      .then((response) => {
        if (response.data.login) {
          dispatch(logined(response.data.user));
          const token = response.data.token;
          localStorage.setItem('token', token);
        }
        else {
          // Token invalid, Remove current token
          if (response.data.tokenExpired) {
            let errorMsg = response.data.error;
            dispatch(logouted(errorMsg));
          } else
            dispatch(logouted());
          localStorage.removeItem('token');
        }
      });
  }
}