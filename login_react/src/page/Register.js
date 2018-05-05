import React from 'react';
var apiUrl = 'http://localhost:4000/'

export default class Register extends React.Component {
  render() {
    let registerUrl = apiUrl + 'users/register';
    return (
      <div className='container'>
        <h2 className='page-header'>Register</h2>
        <p>Please register below</p>
        <form method='post' action={registerUrl} encType='multipart/form-data'>
          <div className='form-group'>
            <label>Name</label>
            <input className='form-control' name='name' type='text'/>
          </div>
          <div className='form-group'>
            <label>Email</label>
            <input className='form-control' name='email' type='email'/>
          </div>
          <div className='form-group'>
            <label>Username</label>
            <input className='form-control' name='username' type='text'/>
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input className='form-control' name='password' type='password'/>
          </div>
          <div className='form-group'>
            <label>Confirm Password</label>
            <input className='form-control' name='confirmPassword' type='password'/>
          </div>
          <div className='form-group'>
            <label>Profile Image</label>
            <input className='form-control' name='profileImage' type='file'/>
          </div>
          <input className='btn btn-primary' name='submit' type='submit' value='Register'/>
        </form>
      </div>
    );
  }
}