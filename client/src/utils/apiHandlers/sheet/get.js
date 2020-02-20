/* eslint-disable import/prefer-default-export */
import Axios from 'axios';
import FileSaver from 'file-saver';
import { initZero } from 'utils/functions/date';

const signal = Axios.CancelToken.source();

// ======================
// GET ORDER BY ID
// ======================
export const getNewOrderSheetTemplate = async onEnd => {
 try {
  const config = {
   headers: {
    'Content-Type': 'application/json',
   },
  };

  const res = await Axios({
   url: `/api/sheet/neworder/template`,
   method: 'GET',
   responseType: 'arraybuffer',
  });
  await FileSaver.saveAs(
   new Blob([res.data], { type: 'application/xlsx' }),
   `Import_wymiarow_BLOW(wzor).xlsx`,
  );
  onEnd();
  return res.data;
 } catch (err) {
  console.log(err);
  onEnd();
  return err;
 }
};
