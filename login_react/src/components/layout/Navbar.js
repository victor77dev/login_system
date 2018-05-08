import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    login: state.user.login
  }
};

function LoginButton(props) {
  if (!props.login) {
    return <li className={props.loginActive}>
      <Link to='/login' className='nav-link'>Login</Link>
    </li>
  }
  return <div></div>;
}

function RegisterButton(props) {
  if (!props.login) {
    return <li className={props.registerActive}>
      <Link to='/register' className='nav-link'>Register</Link>
    </li>
  }
  return <div></div>;
}

function LogoutButton(props) {
  if (props.login) {
    return <li className='nav-item'>
      <Link to='/logout' className='nav-link'>Logout</Link>
    </li>
  }
  return <div></div>;
}

class Navbar extends React.Component {
  render() {
    var { location } = this.props;

    const homeActive = location.pathname.match(/^\/$/) ? 'nav-item active': 'nav-item';
    const loginActive = location.pathname.match(/^\/login/) ? 'nav-item active': 'nav-item';
    const registerActive = location.pathname.match(/^\/register/) ? 'nav-item active': 'nav-item';

    return (
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container'>
          <div className='navbar-header'>
            <a className='navbar-brand' href='/'>Login System</a>
            <button type='button' className='navbar-toggler collapsed' data-toggle='collapse' data-target='.navbar-collapse' aria-expanded='false'>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
            </button>
          </div>

          <div className='navbar-collapse collapse'>
            <ul className='nav navbar-nav mr-auto'>
              <li className={homeActive}>
                <Link to='/' className='nav-link'>Home</Link>
              </li>
              <LoginButton login={this.props.login} loginActive={loginActive} />
              <RegisterButton login={this.props.login} registerActive={registerActive} />
            </ul>
            <ul className='nav navbar-nav navbar-right'>
              <LogoutButton login={this.props.login} />
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default connect(mapStateToProps)(Navbar);