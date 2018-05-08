import React from 'react';
import { Field, reduxForm } from 'redux-form';
import registerSubmit from '../code/registerSubmit';
import registerValidate from '../code/registerValidate';
import registerEmailValidate from '../code/registerEmailValidate';

import { connect } from  'react-redux';

import { fetchUserData } from '../../actions/userActions';

import './stylesheet/loader.css'

const mapStateToProps = (state) => {
  return {
    login: state.user.login,
    loading: state.user.loading
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUserData: () => dispatch(fetchUserData()),
});


const renderField = ({ input, label, type, meta: { touched, error, asyncValidating } }) => (
  <div className='form-group'>
    <label>{label}</label>
    <input {...input} placeholder={label} className='form-control' type={type} />
    {asyncValidating && <div>Checking availability<div className='loader'></div></div>}
    {touched && error && <span>{error}</span>}
  </div>
)

class RegisterForm extends React.Component {
  componentDidMount() {
    this.props.fetchUserData();
  }

  componentDidUpdate() {
    if (!this.props.loading && this.props.login)
      this.props.history.push('/');
  }

  render() {
    const { error, handleSubmit, submitting } = this.props
    return (
      <div className='container'>
        <h2 className='page-header'>Register</h2>
        <p>Please register below</p>
        {error && <div className='alert alert-danger'>{error}</div>}
        <form onSubmit={handleSubmit(registerSubmit)}>
          <Field
            name="name"
            type="text"
            component={renderField}
            label="Name"
          />
          <Field
            name="email"
            type="email"
            component={renderField}
            label="Email"
          />
          <Field
            name="username"
            type="text"
            component={renderField}
            label="Username"
          />
          <Field
            name="password"
            type="password"
            component={renderField}
            label="Password"
          />
          <Field
            name="confirmPassword"
            type="password"
            component={renderField}
            label="Confirm Password"
          />
          <div>
            <button className='btn btn-primary' type="submit" disabled={submitting}>
              Login
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const RegisterReduxForm = reduxForm({
  form: 'register', // a unique identifier for this form
  validate: registerValidate,
  asyncValidate: registerEmailValidate,
  asyncBlurFields: ['email']
})(RegisterForm);

export default connect(mapStateToProps, mapDispatchToProps)(RegisterReduxForm);