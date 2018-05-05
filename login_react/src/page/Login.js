import React from 'react';
var apiUrl = 'http://localhost:4000/'

export default class Login extends React.Component {
  render() {
    let loginUrl = apiUrl + 'users/login';
    return (
      <div className='container'>
        <h2 className='page-header'>Login</h2>
        <p>Please login</p>
        <form method='post' action={loginUrl}>
          <div className='form-group'>
            <label>Email</label>
            <input className='form-control' name='email' type='email'/>
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input className='form-control' name='password' type='password'/>
          </div>
          <input className='btn btn-primary' name='submit' type='submit' value='Login'/>
        </form>
      </div>
    );
  }
}