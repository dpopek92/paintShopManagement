/* eslint-disable import/prefer-default-export */
import Axios from 'axios';

export const getCustomersList = async () => {
 const res = await Axios.get(`/api/customers/all`);
 return res.data;
};
