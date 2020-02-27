import Axios from 'axios';
import {
 userDataChangeValues,
 passwordChangeValues,
 userDataChangeResponse,
} from 'scenes/Settings/Account/utils/types';

export const passwordChange = async (
 values: passwordChangeValues,
 onEnd: () => void,
 onError: (errors: { [key: string]: string }) => void,
) => {
 try {
  const config = {
   headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
   },
  };
  const body = JSON.stringify(values);

  await Axios.put('/api/users/password', body, config);
  onEnd();
 } catch (err) {
  console.log(err.response);
  if (err.response) {
   onError(err.response.data);
  }
 }
};

export const userDataChange = async (
 values: userDataChangeValues,
 onEnd: (data: userDataChangeResponse) => void,
 onError: (errors: { [key: string]: string }) => void,
) => {
 try {
  const config = {
   headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
   },
  };
  const body = JSON.stringify(values);

  const res = await Axios.put('/api/users/data', body, config);
  onEnd(res.data);
 } catch (err) {
  console.log(err.response);
  if (err.response) {
   onError(err.response.data);
  }
 }
};
