import {
  FETCH_USER,
  FETCH_SURVEYS
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

export const sendSurvey = (values, history) => async dispatch => {
  let { data } = await axios.post('/api/surveys', values);
  dispatch({ type: FETCH_USER, payload: data });
  history.push('/surveys');
};

export const fetchSurveys = () => async dispatch => {
  let { data } = await axios.get('/api/surveys');
  dispatch({ type: FETCH_SURVEYS, payload: data });
};

export const deleteSurvey = (id) => async dispatch => {
  let { data } = await axios.delete(`/api/surveys/delete/${id}`);
  dispatch({ type: FETCH_SURVEYS, payload: data });
}
