/* eslint-disable import/prefer-default-export */
import Axios from 'axios';

// const signal = Axios.CancelToken.source();

// ======================
// GET POSITIONS EMPLOYEES
// ======================
export const getEmployeesFromPosition = async (position, onEnd) => {
 try {
  const res = await Axios.get(`/api/employee/employees/${position}`);
  onEnd();
  return res.data;
 } catch (err) {
  console.log(err);
  onEnd();
 }
};
