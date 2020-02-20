import Axios from "axios";
const signal = Axios.CancelToken.source();

//======================
//NEW MESSAGE
//======================
export const addNewMessage = async (msg, pos, onEnd) => {
 try {
  const body = { message: msg, positions: pos };
  await Axios.post(`/api/messages/addmessage`, body);
  onEnd();
 } catch (err) {
  console.log(err.response);
  onEnd();
 }
};
