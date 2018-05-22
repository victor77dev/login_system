import axios from 'axios';

let config = require('../config.json')
var apiUrl = config.server.basePath;

export function logined(user) {
  return {
    type: 'LOGIN',
    payload: user
  }
}

export function logouted() {
  return {
    type: 'LOGOUT'
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
        else
          dispatch(logouted());
      });
  }
}