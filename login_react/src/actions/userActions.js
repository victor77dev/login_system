import axios from 'axios';

var apiUrl = 'http://localhost:4000';

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
    axios.get(apiUrl + '/api/user', {withCredentials: true})
      .then((response) => {
        if (response.data.login)
          dispatch(logined(response.data.user));
        else
          dispatch(logouted());
      });
  }
}