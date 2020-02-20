/* eslint-disable import/prefer-default-export */
import Axios from 'axios';

// ======================
// SET MESSAGE READED
// ======================
export const setMessageReaded = async (messageId, onEnd) => {
 try {
  await Axios.put(`/api/messages/readed/${messageId}`);
  onEnd();
 } catch (err) {
  console.log(err.response);
  onEnd();
 }
};
