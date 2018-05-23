export default function reducer(state= {
    user: {
      name: '',
      email: '',
      username: '',
      profileImage: ''
    },
    login: false,
    errorMsg: '',
    loading: true
  }, action) {

  switch (action.type) {
    case 'LOGIN': {
      return {...state, user: action.payload, login: true, loading: false}
    }
    case 'LOGOUT': {
      return {...state,
        user: {
          name: '',
          email: '',
          username: '',
          profileImage: ''
        },
        login: false,
        errorMsg: action.payload,
        loading: false
      }
    }
    case 'LOADING': {
      return {...state,
        loading: true
      }
    }
    default:
      // do nothing
  }
  return state;
}
