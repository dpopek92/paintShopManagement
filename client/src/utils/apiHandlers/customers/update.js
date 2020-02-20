import Axios from 'axios';

// const signal = Axios.CancelToken.source();

// ======================
// UPDATE CUSTOMER PRICES
// ======================
export const setCustomerPrices = async (userId, prices, end) => {
 try {
  const config = {
   headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
   },
  };
  const body = JSON.stringify(prices);
  await Axios.put(`/api/profile/user/discounts/${userId}`, body, config);
  end();
 } catch (err) {
  end();
  console.log(err.response);
 }
};

// ======================
// UPDATE CUSTOMER PRICES
// ======================
export const setCustomerSubordinates = async (
 customerId,
 subordinates,
 end,
) => {
 try {
  const config = {
   headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
   },
  };
  const body = { subordinates };
  const res = await Axios.put(
   `/api/profile/subordinates/${customerId}`,
   body,
   config,
  );
  console.log(res.data);
  end();
 } catch (err) {
  end();
  console.log(err.response);
 }
};
