import {
  FETCH_USER,
  SEND_SURVEY
} from './types';
import axios from 'axios';

export const fetchUser = () => async dispatch => {
  let { data } = await axios.get('/auth/current_user');
  dispatch({ type: FETCH_USER, payload: data });
};

export const handleToken = (token) => async dispatch => {
  let { data } = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: data });
};

export const sendSurvey = (values) => ({
  type: SEND_SURVEY,
  payload: values
});
