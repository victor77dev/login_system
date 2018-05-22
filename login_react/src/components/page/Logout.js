import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { fetchUserData } from '../../actions/userActions';

let config = require('../../config.json')
var apiUrl = config.server.basePath;

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    login: state.user.login
  }
};

const mapDispatchToProps = dispatch => ({
  fetchUserData: () => dispatch(fetchUserData()),
});

function logout() {
  return axios.get(apiUrl + '/api/logout')
  .then((response) => {
    // Remove token from localStorage
    localStorage.removeItem('token');
  })
}

class Logout extends React.Component {
  componentDidMount() {
    logout(this.props).then(() => {
      this.props.fetchUserData();
      this.props.history.push('/login');
    });
  }

  render() {
    return (
      <div className='container'>Logout!!!</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);