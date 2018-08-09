import React from 'react';

import { connect } from 'react-redux';

import { fetchUserData } from '../../actions/userActions';

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    login: state.user.login,
    loading: state.user.loading,
    errorMsg: state.user.errorMsg
  }
};

const mapDispatchToProps = dispatch => ({
  fetchUserData: () => dispatch(fetchUserData()),
});

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchUserData();
  }

  componentDidUpdate() {
    if (!this.props.loading && !this.props.login)
      this.props.history.push('/login');
  }

  render() {
    const { user, errorMsg } = this.props;
    const { name, email, username, profileImage } = user;
    if (errorMsg !== '' && name === '' && email === '' && username === '' && profileImage === '')
      return (
        <div className='container'>
          <h1>Server is not available!!!</h1>
          <h1>Please contact the administrator!</h1>
        </div>
      );
    if (name === '' && email === '' && username === '' && profileImage === '')
      return (
        <div className='container'>
          <h1>Server is inactive!!!</h1>
          <h1>Please wait for ~30s!</h1>
        </div>
      );
    return (
      <div className='container'>
        Welcome {name}!!!
        <ul>
          <li>email: {email}</li>
          <li>username: {username}</li>
          <li>profileImage: {profileImage}</li>
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);