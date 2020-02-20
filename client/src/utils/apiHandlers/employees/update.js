/* eslint-disable import/prefer-default-export */
import Axios from 'axios';

// const signal = Axios.CancelToken.source();

// ======================
// UPDATE EMPLOYEE POSITIONS
// ======================
export const setEmployeePositions = async (employeeId, positions, onEnd) => {
 const data = { id: employeeId, positions };
 try {
  await Axios.put(`/api/employee/${employeeId}/position`, data);
  onEnd();
 } catch (err) {
  console.log(err);
  onEnd();
 }
};

// ======================
// UPDATE EMPLOYEE EARNINGS
// ======================
export const setEmployeeEarnings = async (employeeId, earnings, onEnd) => {
 const body = { id: employeeId, earnings };
 try {
  await Axios.put(`/api/employee/${employeeId}/earnings`, body);
  onEnd();
 } catch (err) {
  console.log(err);
  onEnd();
 }
};
