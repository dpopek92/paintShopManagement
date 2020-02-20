import Axios from 'axios';
import FileSaver from 'file-saver';
import { currentDate as date } from 'const/';
import { dateToString } from 'utils/functions/date';
const signal = Axios.CancelToken.source();

// ======================
// DOWNLOAD ORDER FILES
// ======================
export const downloadOrderFiles = async (order, orderId) => {
 try {
  const body = { id: orderId };
  const res = await Axios({
   url: `/api/sheet/`,
   method: 'POST',
   responseType: 'arraybuffer',
   data: body,
  });
  FileSaver.saveAs(
   new Blob([res.data], { type: 'application/zip' }),
   `${order.user.company}_${order.number}.zip`,
  );
 } catch (err) {
  console.log(err.response);
 }
};

// ======================
// DOWNLOAD ORDER LABEL
// ======================
export const downloadOrderLabel = async (order, orderId) => {
 try {
  const res = await Axios({
   url: `/api/sheet/label/${orderId}`,
   method: 'POST',
   responseType: 'arraybuffer',
  });
  FileSaver.saveAs(
   new Blob([res.data], { type: 'image/png' }),
   `${order.user.company}-${order.number}[STICKER].png`,
  );
 } catch (err) {
  console.log(err.response);
 }
};

// ======================
// DOWNLOAD ORDER PICK UP REPORT
// ======================
export const downloadOrderPickUpReport = async (
 order,
 orderId,
 pickedUpElements,
 position,
) => {
 try {
  const body = { orderId, pickedUpElements, position };
  const res = await Axios({
   url: `/api/sheet/pickupreport`,
   method: 'POST',
   data: body,
   responseType: 'arraybuffer',
  });
  FileSaver.saveAs(
   new Blob([res.data], { type: 'application/pdf;charset=utf-8' }),
   `${order.user.company}-${order.number}[PROTOKÓŁ ODBIORU].pdf`,
  );
 } catch (err) {
  console.log(err.response);
 }
};

// ======================
// DOWNLOAD PDF IMAGE
// ======================
export const downloadPdfImage = async (order, orderId, path, name) => {
 try {
  const body = { path, orderId };
  const res = await Axios({
   url: `/api/sheet/getpdf`,
   method: 'POST',
   responseType: 'arraybuffer',
   data: body,
  });
  FileSaver.saveAs(
   new Blob([res.data], { type: 'application/pdf' }),
   `${order.user.company}_${order.number}_${name}.pdf`,
  );
 } catch (err) {
  console.log(err.response);
 }
};

// ======================
// DOWNLOAD PRODUCTION LIST
// ======================
export const downloadProductionList = async (list, end) => {
 try {
  const body = list;
  const res = await Axios({
   url: `/api/sheet/productionlist`,
   method: 'POST',
   responseType: 'arraybuffer',
   data: body,
  });
  FileSaver.saveAs(
   new Blob([res.data], { type: 'application/xlsx' }),
   `Lista_produkcyjna - ${dateToString(date)}.xlsx`,
  );
  end();
 } catch (err) {
  console.log(err.response);
  end();
 }
};

// ======================
// GET ORDERS FROM ARRAY OF IDs
// ======================
export const getOrdersFromArray = async arrayOfId => {
 try {
  const body = { arrayOfId };
  const res = await Axios.post(`/api/orders/id_array`, body, {
   CancelToken: signal.token,
  });
  return res.data;
 } catch (err) {
  console.log(err.response);
 }
};
