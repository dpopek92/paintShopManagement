import Axios from 'axios';
import { PricesT } from 'services/store/types/settings/Settings';

export const customerDiscountsUpdate = async (
 customerId: string,
 userPrices: PricesT,
 onEnd: () => void,
 onError: (errors: { [key: string]: string }) => void,
) => {
 try {
  const headers = {
   'Access-Control-Allow-Origin': '*',
   'Content-Type': 'application/json',
  };

  await Axios.put(
   `/api/customers/discounts/${customerId}`,
   { userPrices },
   {
    headers,
   },
  );
  onEnd();
 } catch (err) {
  onError(err.response.data);
  console.log(err.response);
 }
};
