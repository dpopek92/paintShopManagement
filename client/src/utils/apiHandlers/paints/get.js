/* eslint-disable import/prefer-default-export */
import Axios from 'axios';
import FileSaver from 'file-saver';
import { initZero } from 'utils/functions/date';

const signal = Axios.CancelToken.source();

// ======================
// GET ORDERS BY DATE
// ======================
export const getOrdersByDate = async (year, month, onEnd) => {
 try {
  const config = {
   headers: {
    'Content-Type': 'application/json',
   },
  };
  const body = { year, month };

  const res = await Axios.post('/api/paints/', body, config);
  onEnd();
  return res.data;
 } catch (err) {
  console.log(err);
  onEnd();
  return err;
 }
};

// ======================
// GET ORDER BY ID
// ======================
export const getOrderById = async (year, month, day, id, onEnd) => {
 try {
  const config = {
   headers: {
    'Content-Type': 'application/json',
   },
  };
  const body = { year, month, day };

  //   const res = await Axios.post(`/api/paints/${id}`, body, config);

  const res = await Axios({
   url: `/api/paints/${id}`,
   method: 'POST',
   responseType: 'arraybuffer',
   data: body,
  });
  await FileSaver.saveAs(
   new Blob([res.data], { type: 'application/xlsx' }),
   `Lakiery_${initZero(day)}-${initZero(month)}-${year}r.xlsx`,
  );
  onEnd();
  return res.data;
 } catch (err) {
  console.log(err);
  onEnd();
  return err;
 }
};
