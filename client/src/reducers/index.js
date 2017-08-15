import { combineReducers } from 'redux';

import auth from './authReducer';
import surveys from './surveysReducer';
import { reducer as form } from 'redux-form';

export default combineReducers({
  auth,
  surveys,
  form
});
