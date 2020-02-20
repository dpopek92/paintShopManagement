import Axios from "axios";
const signal = Axios.CancelToken.source();

//======================
//ACCOUNT REMOVE
//======================
export const accountRemove = async (userData, onEnd, onError) => {
 try {
  const config = {
   headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
   }
  };
  const body = JSON.stringify(userData);

  await Axios.delete(`/api/profile/user/me`, body, config);
  onEnd();
 } catch (err) {
  onError();
  console.log(err.response);
 }
};
//======================
//EMPLOYEE ACCOUNT REMOVE
//======================
export const employeeAccountRemove = async (userData, onEnd, onError) => {
 try {
  const config = {
   headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
   }
  };
  const body = JSON.stringify(userData);

  await Axios.delete(`/api/employee/me`, body, config);

  onEnd();
 } catch (err) {
  onError();
  console.log(err.response);
 }
};
