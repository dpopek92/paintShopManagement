/* eslint-disable import/prefer-default-export */
import Axios from 'axios';
import FileSaver from 'file-saver';
import { initZero } from 'utils/functions/date';

const signal = Axios.CancelToken.source();

// ======================
// POST NEW ORDER
// ======================
export const newOrder = async (skippedOrders, paintsOrders, onEnd) => {
 const date = new Date();
 const year = date.getFullYear();
 const month = date.getMonth() + 1;
 const day = date.getDate();
 try {
  const config = {
   headers: {
    'Content-Type': 'application/json',
   },
  };
  const body = {
   skippedOrders,
   paintsOrders,
  };

  //   const res = await Axios.post('', body, config);
  const res = await Axios({
   url: `/api/paints/neworder`,
   method: 'POST',
   responseType: 'arraybuffer',
   data: body,
  });
  await FileSaver.saveAs(
   new Blob([res.data], { type: 'application/xlsx' }),
   `Lakiery_${initZero(day)}-${initZero(month)}-${year}r.xlsx`,
  );

  console.log(res);
  onEnd();
  return res.data;
 } catch (err) {
  console.log(err);
  onEnd();
  return err;
 }
};
