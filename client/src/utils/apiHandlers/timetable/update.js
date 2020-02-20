/* eslint-disable import/prefer-default-export */
import Axios from 'axios';

const signal = Axios.CancelToken.source();

// ======================
// UPDATE TIMETABLE
// ======================
export const updateTimetable = async (position, dayId, orders, end) => {
 try {
  const body = { position, dayId, orders };
  const res = await Axios.put(`/api/timetable`, body, {
   CancelToken: signal.token,
  });
  console.log(res.data);
  end();
  return res.data;
 } catch (err) {
  console.log(err.response);
  end();
  return err;
 }
};

// ======================
// ADD ORDER TO TIMETABLES
// ======================
export const addOrderToTimetables = async (body, end) => {
 try {
  const res = await Axios.put(`/api/timetable/addorder`, body, {
   CancelToken: signal.token,
  });
  console.log(res.data);
  end();
  return res.data;
 } catch (err) {
  console.log(err.response);
  end();
  return err;
 }
};

// ======================
// EDIT ORDER IN TIMETABLES
// ======================
export const editOrderInTimetables = async (body, end) => {
 try {
  const res = await Axios.put(`/api/timetable/editorder`, body, {
   CancelToken: signal.token,
  });
  console.log(res.data);
  end();
  return res.data;
 } catch (err) {
  console.log(err.response);
  end();
  return err;
 }
};

// ======================
// REMOVE ORDER FORM DAY
// ======================
export const removeOrderFromDay = async (body, end) => {
 try {
  const res = await Axios.put(`/api/timetable/removeorder`, body, {
   CancelToken: signal.token,
  });
  console.log(res.data);
  end();
  return res.data;
 } catch (err) {
  console.log(err.response);
  end();
  return err;
 }
};
