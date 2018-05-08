import React from 'react';

import { connect } from 'react-redux';

import { fetchUserData } from '../../actions/userActions';

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    login: state.user.login,
    loading: state.user.loading
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
    return (
      <div className='container'>
        Welcome {this.props.user.name}!!!
        <ul>
          <li>email: {this.props.user.email}</li>
          <li>username: {this.props.user.username}</li>
          <li>profileImage: {this.props.user.profileImage}</li>
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);