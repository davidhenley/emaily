import { combineReducers } from 'redux';

import auth from './authReducer';
import surveys from './surveysReducer';

export default combineReducers({
  auth,
  surveys
});
