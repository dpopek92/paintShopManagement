/* eslint-disable import/prefer-default-export */
import Axios from 'axios';

const config = {
 headers: {
  'Content-Type': 'application/json',
 },
};

interface Values {
 firstname: string;
 surname: string;
 company: string;
 email: string;
 password: string;
 password2: string;
 rodo: boolean;
 reg: boolean;
 msg: boolean;
}
export const createNewAccount = async (
 values: Values,
 onEnd: () => void,
 onErr: (errors: { [key: string]: string }) => void,
) => {
 try {
  const body = JSON.stringify(values);
  const res = await Axios.post(`/api/users/`, body, config);

  onEnd();
  return res.data;
 } catch (err) {
  console.log(err);
  if (err.response) {
   console.log(`ERROR`, err.response);
   onErr(err.response.data);
  }
 }
};
