import Axios from 'axios';

export const customerAccountRemove = async (
 userId: string,
 onEnd: () => void,
 onError: (errors: { [key: string]: string }) => void,
) => {
 try {
  const headers = {
   'Access-Control-Allow-Origin': '*',
   'Content-Type': 'application/json',
  };

  await Axios.delete(`/api/customers/${userId}`, {
   headers,
  });
  onEnd();
 } catch (err) {
  onError(err.response.data);
  console.log(err.response);
 }
};
