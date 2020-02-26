/* eslint-disable import/prefer-default-export */
import Axios from 'axios';

interface AuthValues {
 email: string;
 password: string;
}

export const authUser = async (
 values: AuthValues,
 onEnd: (token: string) => void,
 onErr: (errors: { [key: string]: string }) => void,
) => {
 console.log('AUTH', 'getToken');
 try {
  const config = {
   headers: {
    'Content-Type': 'application/json',
   },
  };
  const body = JSON.stringify(values);
  const res = await Axios.post('/api/auth/', body, config);

  onEnd(res.data.token);
  return res.data.token;
 } catch (err) {
  console.log(err);
  if (err.response) {
   console.log(`ERROR`, err.response);
   onErr(err.response.data);
  }
 }
};
