import Axios from "axios";
import FileSaver from "file-saver";
const signal = Axios.CancelToken.source();

//======================
//DELETE ORDER
//======================
export const orderRemove = async (orderId, onEnd, onErr) => {
 try {
  await Axios.delete(`/api/orders/${orderId}`);
  onEnd();
 } catch (err) {
  console.log(err.response);
  onErr();
 }
};
