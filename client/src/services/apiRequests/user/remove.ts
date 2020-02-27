import Axios from 'axios';

export const accountRemove = async (
 password: string,
 onEnd: () => void,
 onError: (errors: { [key: string]: string }) => void,
) => {
 try {
  const headers = {
   'Access-Control-Allow-Origin': '*',
   'Content-Type': 'application/json',
  };

  const body = { password };

  await Axios.delete(`/api/users/`, {
   data: body,
   headers,
  });
  onEnd();
 } catch (err) {
  onError(err.response.data);
  console.log(err.response);
 }
};
