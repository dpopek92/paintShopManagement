import Axios from "axios";
import setAuthToken from "../../helpers/setAuthToken";
const signal = Axios.CancelToken.source();

export const addOrderStatusByApp = async (orderId, productionStatus) => {
 // console.log("x");
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const body = { productionStatus };
  await Axios.put(`/api/orders/addstatusbyapp/${orderId}`, body);
  // console.log(body);
 } catch (err) {
  console.log(err.response);
 }
};

export const handlePaidStatus = async (id, isPaid, end) => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const body = { isPaid };
  await Axios.put(`/api/orders/paidstatus/${id}`, body);
  end();
 } catch (err) {
  console.log(err.response);
 }
};
