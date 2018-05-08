import React from 'react'
import { Field, reduxForm } from 'redux-form'
import loginSubmit from './loginSubmit'

import { connect } from  'react-redux'

import { fetchUserData } from '../../actions/userActions';

const mapStateToProps = (state) => {
  return {
    msg: state.register.msg,
    login: state.user.login,
    loading: state.user.loading
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUserData: () => dispatch(fetchUserData()),
});

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className='form-group'>
    <label>{label}</label>
    <input {...input} placeholder={label} className='form-control' type={type} />
    {touched && error && <span>{error}</span>}
  </div>
)

class LoginForm extends React.Component {
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
        <h2 className='page-header'>Login</h2>
        {this.props.msg && <div className='alert alert-success'>{this.props.msg}</div>}
        <p>Please login</p>
        {error && <div className='alert alert-danger'>{error}</div>}
        <form onSubmit={handleSubmit(loginSubmit)}>
          <Field
            name="email"
            type="text"
            component={renderField}
            label="Email"
          />
          <Field
            name="password"
            type="password"
            component={renderField}
            label="Password"
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

const LoginReduxForm = reduxForm({
  form: 'login' // a unique identifier for this form
})(LoginForm);

export default connect(mapStateToProps, mapDispatchToProps)(LoginReduxForm);