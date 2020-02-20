/* eslint-disable import/prefer-default-export */
import Axios from 'axios';
import {
 GET_TIMETABLE,
 GET_TIMETABLE_ERROR,
 SET_TIMETABLE_POSITIONS,
 SET_TIMETABLE_ACTIVE_DAY,
 UNSET_TIMETABLE_ACTIVE_DAY,
 TIMETABLE_ORDER_REMOVE,
 TIMETABLE_ORDER_MOVE,
 TIMETABLE_ORDER_ADD,
} from './types';
import setAuthToken from '../helpers/setAuthToken';

export const addOrderToActiveDay = (position, order) => dispatch =>
 dispatch({ type: TIMETABLE_ORDER_ADD, position, order });

export const moveOrderInActiveDay = (position, way, index) => dispatch =>
 dispatch({ type: TIMETABLE_ORDER_MOVE, position, way, index });

export const removeOrderFromActiveDay = (position, orderId) => dispatch =>
 dispatch({ type: TIMETABLE_ORDER_REMOVE, position, orderId });

export const unsetTimetableActiveDay = () => dispatch =>
 dispatch({ type: UNSET_TIMETABLE_ACTIVE_DAY });

export const setTimetableActiveDay = (date, day) => dispatch =>
 dispatch({ type: SET_TIMETABLE_ACTIVE_DAY, date, day });

export const setTimetablePositions = (position, value) => dispatch =>
 dispatch({ type: SET_TIMETABLE_POSITIONS, position, value });

export const getAllTimetables = (cancel, onEnd) => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const res = await Axios.get(`/api/timetable/`, {
   cancelToken: cancel,
  });

  dispatch({ type: GET_TIMETABLE, timetables: res.data });
  onEnd();
 } catch (err) {
  console.log(err);
  dispatch({ type: GET_TIMETABLE_ERROR });
  onEnd();
 }
};

export const getTimetablesForPosition = (
 position,
 cancel,
 onEnd,
) => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const res = await Axios.get(`/api/timetable/${position}`, {
   cancelToken: cancel,
  });

  dispatch({ type: GET_TIMETABLE, timetables: res.data });
  onEnd();
 } catch (err) {
  console.log(err);
  dispatch({ type: GET_TIMETABLE_ERROR });
  onEnd();
 }
};
