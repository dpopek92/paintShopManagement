import Axios from "axios";
const signal = Axios.CancelToken.source();

//======================
//DELETE MESSAGE
//======================
export const removeMessage = async (messageId, onEnd) => {
 try {
  await Axios.delete(`/api/messages/${messageId}`);
  onEnd();
 } catch (err) {
  console.log(err.response);
  onEnd();
 }
};
