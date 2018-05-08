import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';
import registerReducer from './registerReducer';
import userReducer from './userReducer';

export default combineReducers({
  form: formReducer,
  register: registerReducer,
  user: userReducer
})