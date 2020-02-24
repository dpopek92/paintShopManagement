/* eslint-disable import/prefer-default-export */
import Axios from 'axios';

export const getCustomersList = async cancelToken => {
 const res = await Axios.get(`/api/profile/users`, {
  cancelToken,
 });
 return res.data;
};
