import {
  FETCH_USER
} from './types';
import axios from 'axios';

export const fetchUser = () => async dispatch => {
  let { data } = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: data });
};
