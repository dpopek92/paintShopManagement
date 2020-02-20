import Axios from "axios";
import setAuthToken from "../../helpers/setAuthToken";
const signal = Axios.CancelToken.source();

export const getOrders = async arrayOfId => {
 // console.log("x");
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const body = { arrayOfId };
  const res = await Axios.post(`/api/orders/id_array`, body, {
   CancelToken: signal.token
  });
  return res.data;
 } catch (err) {
  console.log(err.response);
 }
};

export const getMonthProductionSummary = async (year, month, end) => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const body = { year, month };
  const res = await Axios.post(`/api/stats/production/summary`, body, {
   CancelToken: signal.token
  });
  end(res.data);
  return res.data;
 } catch (err) {
  console.log(err.response);
 }
};
