import Axios from 'axios';
import FileSaver from 'file-saver';

const signal = Axios.CancelToken.source();

export const getOrders = async arrayOfId => {
 try {
  const body = { arrayOfId };
  const res = await Axios.post(`/api/orders/id_array`, body, {
   CancelToken: signal.token,
  });
  return res.data;
 } catch (err) {
  console.log(err.response);
  return err;
 }
};

// ======================
// GET MONTH PRODUCTION SUMMARY
// ======================
export const getMonthProductionSummary = async (year, month, setData) => {
 try {
  const body = { year, month };
  const res = await Axios.post(`/api/stats/production/summary`, body, {
   CancelToken: signal.token,
  });
  setData(res.data);
  return res.data;
 } catch (err) {
  console.log(err.response);
  return err;
 }
};

// ======================
// GET MONTH EMPLOYEES WORKED HOURS
// ======================
export const getWorkedHours = async (year, month) => {
 try {
  const body = { year, month };
  const res = await Axios.post(`/api/stats/employees/workedhours`, body, {
   CancelToken: signal.token,
  });
  return res.data;
 } catch (err) {
  console.log(err.response);
  return err;
 }
};

// ======================
// GET MONTH EMPLOYEES REPORT
// ======================
export const getMonthReport = async (year, month, position, employees, end) => {
 try {
  const body = { year, month, position, employees };
  const res = await Axios({
   url: `/api/sheet/employees/report`,
   method: 'POST',
   responseType: 'arraybuffer',
   data: body,
  });
  FileSaver.saveAs(
   new Blob([res.data], { type: 'application/xlsx' }),
   `Raport_${month}-${year}_${position}.xlsx`,
  );
  end();
  return res.data;
 } catch (err) {
  console.log(err.response);
  end();
  return err;
 }
};
