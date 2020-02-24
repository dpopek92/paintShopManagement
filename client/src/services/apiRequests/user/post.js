/* eslint-disable import/prefer-default-export */
import Axios from 'axios';

export const createNewAccount = async (values, onEnd, onErr) => {
 try {
  const config = {
   headers: {
    'Content-Type': 'application/json',
   },
  };
  const body = JSON.stringify(values);
  const res = await Axios.post(`/api/users/`, body, config);
  onEnd();
  return res.data;
 } catch (err) {
  console.log(err);
  if (err.response) {
   console.log(`ERROR`, err.response);
   onErr(err.response.data);
  }
 }
};
