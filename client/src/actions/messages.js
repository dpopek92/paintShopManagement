import Axios from 'axios';
import { GET_MESSAGES, GET_MESSAGES_ERROR } from './types';
import setAuthToken from '../helpers/setAuthToken';

export const getEmployeeMessages = (
 position,
 end,
 cancel,
) => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const res = await Axios.get(`/api/messages/user/${position}`, {
   cancelToken: cancel,
  });

  // console.log(res.data);
  if (Array.isArray(res.data)) {
   dispatch({ type: GET_MESSAGES, value: res.data });
  }
  end();
 } catch (err) {
  if (Axios.isCancel(err)) {
   console.log(`Error: ${err.message}`);
  } else {
   console.log(err);
  }
  dispatch({ type: GET_MESSAGES_ERROR });
  end();
 }
};

export const getAllMessages = (end, cancel) => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const res = await Axios.get(`/api/messages/all`, {
   cancelToken: cancel,
  });

  // console.log(res.data);
  if (Array.isArray(res.data)) {
   dispatch({ type: GET_MESSAGES, value: res.data });
  }
  end();
 } catch (err) {
  if (Axios.isCancel(err)) {
   console.log(`Error: ${err.message}`);
  } else {
   console.log(err);
  }
  dispatch({ type: GET_MESSAGES_ERROR });
  end();
 }
};
