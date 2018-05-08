export default function reducer(state= {
    msg: '',
  }, action) {

  switch (action.type) {
    case 'REGISTERED': {
      return {...state, msg: action.payload}
    }
    default:
      // do nothing
  }
  return state;
}
