import Axios from "axios";
const signal = Axios.CancelToken.source();

//======================
//EMPLOYEE REMOVE
//======================
export const employeeRemove = async (employeeId, onEnd) => {
 try {
  await Axios.delete(`/api/employee/${employeeId}`);
  onEnd();
 } catch (err) {
  console.log(err);
  onEnd();
 }
};
