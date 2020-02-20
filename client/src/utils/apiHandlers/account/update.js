import Axios from 'axios';
import FileSaver from 'file-saver';
const signal = Axios.CancelToken.source();

//======================
//UPDATE ACCOUNT
//======================
export const updateUserData = async (updateUser, onEnd) => {
 try {
  const config = {
   headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
   },
  };
  const body = JSON.stringify(updateUser);

  await Axios.put('/api/profile/', body, config);
  onEnd();
 } catch (err) {
  onEnd();
  console.log(err.response);
 }
};

//======================
//UPDATE PASSWORD
//======================
export const passwordUpdate = async (password, onEnd, onError) => {
 try {
  const config = {
   headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
   },
  };
  const body = JSON.stringify(password);

  await Axios.put('/api/profile/password', body, config);
  onEnd();
 } catch (err) {
  if (err.response.status === 400) {
   onError(err.response.data.msg);
  }
  console.log(err.response);
 }
};

//======================
//RECOVER PASSWORD
//======================
export const passwordRecover = async (userId, password, onEnd) => {
 try {
  const config = {
   headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
   },
  };
  const body = { password };

  await Axios.put(`/api/profile/passwordrecover/${userId}`, body, config);
  onEnd();
 } catch (err) {
  if (err.response.status === 400) {
   onEnd();
  }
  console.log(err.response);
 }
};

//======================
//UPDATE EMPLOYEE PASSWORD
//======================
export const employeePasswordUpdate = async (password, onEnd, onError) => {
 try {
  const config = {
   headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
   },
  };
  const body = JSON.stringify(password);

  await Axios.put('/api/employee/password', body, config);
  onEnd();
 } catch (err) {
  if (err.response.status === 400) {
   onError(err.response.data.msg);
  }

  console.log(err.response.data.msg);
 }
};

//======================
//UPDATE EMPLOYEE PROFILE
//======================
export const updateEmployeeProfile = async (employeeId, data, onEnd) => {
 try {
  const config = {
   headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
   },
  };
  const body = JSON.stringify(data);

  await Axios.put(`/api/employee/${employeeId}/profile`, body, config);

  onEnd();
 } catch (err) {
  onEnd();
  console.log(err);
 }
};
