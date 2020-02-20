/* eslint-disable import/prefer-default-export */
import Axios from 'axios';

const signal = Axios.CancelToken.source();

// ======================
// REMIND PASSWORD
// ======================
export const passwordRemind = async (email, onEnd) => {
 try {
  const config = {
   headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
   },
  };
  const body = { email };

  await Axios.post(`/api/users/remindpassword`, body, config);
  onEnd();
 } catch (err) {
  onEnd();
  console.log(err.response);
 }
};
