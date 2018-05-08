const registerValidate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 6) {
    errors.password = 'Must be at least 6 characters';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required'
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Password does not match';
  }
  return errors
}

export default registerValidate;