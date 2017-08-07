import {
  FETCH_USER
} from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      // returns the user model or false if none found
      return action.payload || false;
    default:
      return state;
  }
};
