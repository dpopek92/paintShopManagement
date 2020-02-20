/* eslint-disable no-console */
import Axios from 'axios';

const signal = Axios.CancelToken.source();

// ======================
// SET PAID STATUS
// ======================
export const handlePaidStatus = async (orderId, isPaid, end) => {
 try {
  const body = { isPaid };
  await Axios({
   method: 'put',
   url: `/api/orders/paidstatus/${orderId}`,
   data: body,
   CancelToken: signal.token,
  });
  end();
 } catch (err) {
  console.log(err.response);
 }
};

// ======================
// CHANGE PRICE
// ======================
export const changePrice = async (orderId, price) => {
 try {
  const body = { price };
  await Axios({
   method: 'put',
   url: `/api/orders/price/${orderId}`,
   data: body,
   CancelToken: signal.token,
  });
 } catch (err) {
  console.log(err.response);
 }
};

// ======================
// CHANGE MANHOURS
// ======================
export const changeManHours = async (orderId, manHours, onEnd) => {
 try {
  const body = { manHours };
  await Axios({
   method: 'put',
   url: `/api/orders/manhours/${orderId}`,
   data: body,
   CancelToken: signal.token,
  });
  onEnd();
 } catch (err) {
  console.log(err.response);
  onEnd();
 }
};

// ======================
// SET LOST ELEMENTS
// ======================
export const setLostElements = async (orderId, elements, position) => {
 try {
  const config = {
   headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
   },
  };
  const body = { elements, position };
  await Axios.put(`/api/orders/lostelements/${orderId}`, body, config);

  sessionStorage.setItem('lastEditedOrder', orderId);
 } catch (error) {
  console.log(error);
 }
};

// ======================
// SET ELEMENTS TO CORRECT
// ======================
export const setElementsToCorrect = async (
 orderId,
 elements,
 position,
 whereElementsToCorrect,
 reasonOfComplaint,
 onEnd,
) => {
 try {
  const config = {
   headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
   },
  };
  const body = {
   elements,
   position,
   whereElementsToCorrect,
   reasonOfComplaint,
  };
  await Axios.put(`/api/orders/elementstocorrect/${orderId}`, body, config);
  onEnd();
 } catch (err) {
  onEnd();
  console.log(err.response);
 }
};

// ======================
// ADD ORDER STATUS
// ======================
export const addOrderStatus = async (orderId, productionStatus) => {
 try {
  const config = {
   headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
   },
  };
  const body = JSON.stringify({ productionStatus });
  await Axios.put(`/api/orders/addstatus/${orderId}`, body, config);

  sessionStorage.setItem('lastEditedOrder', orderId);
 } catch (error) {
  console.log(error);
 }
};

// ======================
// CHANGE ORDER STATUS
// ======================
export const changeOrderStatus = async (orderId, status) => {
 try {
  const config = {
   headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
   },
  };
  const body = JSON.stringify(status);
  await Axios.put(`/api/orders/${orderId}`, body, config);

  sessionStorage.setItem('lastEditedOrder', orderId);
 } catch (err) {
  console.log(err.response);
 }
};

// ======================
// CHANGE ORDER FINISH DATE
// ======================
export const changeOrderFinishDate = async (orderId, date) => {
 try {
  const body = { date };
  await Axios.put(`/api/orders/date/${orderId}`, body);

  sessionStorage.setItem('lastEditedOrder', orderId);
 } catch (err) {
  console.log(err.response);
 }
};

// ======================
// ADD COMMENT
// ======================
export const addOrderComment = async (orderId, comment, position) => {
 try {
  const body = { position, comment };
  await Axios.put(`/api/orders/employeecomment/${orderId}`, body);
 } catch (err) {
  console.log(err.response);
 }
};

// ======================
// SET ORDER PRIORITY
// ======================
export const setOrderPriority = async (orderId, priority) => {
 try {
  const body = { priority };
  await Axios.put(`/api/orders/priority/${orderId}`, body);

  sessionStorage.setItem('lastEditedOrder', orderId);
 } catch (err) {
  console.log(err.response);
 }
};

// ======================
// SET ORDER PAINT MAKERS
// ======================
export const setOrderPaintMakers = async (
 orderId,
 paintMaker,
 paintMakerBase,
) => {
 try {
  const body = { paintMaker, paintMakerBase };
  await Axios.put(`/api/orders/paintmaker/${orderId}`, body);

  sessionStorage.setItem('lastEditedOrder', orderId);
 } catch (err) {
  console.log(err.response);
 }
};

// ======================
// SET ORDER READY TO PICK UP
// ======================
export const setOrderReadyToPickUp = async (orderId, onEnded) => {
 try {
  const config = {
   headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
   },
  };
  await Axios.put(`/api/orders/readytopickup/${orderId}`, {}, config);
  onEnded();
 } catch (err) {
  onEnded();
  console.log(err.response);
 }
};

// ======================
// START ORDER
// ======================
export const startOrder = async (orderId, position, onEnd) => {
 try {
  const body = { position };
  await Axios.put(`/api/orders/startorder/${orderId}`, body);
  onEnd();
 } catch (err) {
  console.log(err.response);
  onEnd();
 }
};

// ======================
// PAUSE ORDER
// ======================
export const pauseOrder = async (orderId, position, orderEmployees, onEnd) => {
 try {
  const body = {
   orderEmployees,
   position,
  };
  await Axios.put(`/api/orders/pause/${orderId}`, body);
  onEnd();
 } catch (err) {
  console.log(err.response);
  onEnd();
 }
};

// ======================
// STOP ORDER
// ======================
export const stopOrder = async (
 orderId,
 position,
 orderEmployees,
 halfGrinding,
 isOrderCompleted,
 onEnd,
 onError,
) => {
 try {
  const body = {
   orderEmployees,
   position,
   halfGrinding,
   isOrderCompleted,
  };
  const res = await Axios.put(`/api/orders/stoporder/${orderId}`, body);
  console.log(res.data);
  onEnd();
 } catch (err) {
  console.log(err.response);
  onError();
 }
};
