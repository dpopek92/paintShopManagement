/* eslint-disable import/prefer-default-export */
import Axios from 'axios';

const signal = Axios.CancelToken.source();

// ======================
// GET MONTH EMPLOYEES WORKED HOURS
// ======================
export const updateWorkedHours = async (year, month, data, end) => {
 try {
  const body = { year, month, data };
  const res = await Axios.put(`/api/stats/employees/workedhours`, body, {
   CancelToken: signal.token,
  });
  console.log(res.data);
  end();
  return res.data;
 } catch (err) {
  console.log(err.response);
  end();
  return err;
 }
};
