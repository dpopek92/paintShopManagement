import {
 CUSTOMERS_LIST_LOADED,
 CUSTOMER_ORDERS_LOADED,
 CUSTOMER_DATA_LOADED,
 CUSTOMER_ORDERS_ERROR,
 CUSTOMER_DATA_ERROR,
 CUSTOMERS_LIST_ERROR,
 CUSTOMER_SET_SORT,
} from '../types';

const initialState = {
 list: null,
 sortBy: 'company',
 sortDirection: 'ascend',
 customerOrders: null,
 customerData: null,
};

export default (state = initialState, action) => {
 switch (action.type) {
  case CUSTOMERS_LIST_LOADED:
   return { ...state, list: action.list };
  case CUSTOMER_ORDERS_LOADED:
   return { ...state, customerOrders: action.customerOrders };
  case CUSTOMER_DATA_LOADED:
   return { ...state, customerData: action.customerData };
  case CUSTOMERS_LIST_ERROR:
   return { ...state, list: null };
  case CUSTOMER_ORDERS_ERROR:
   return { ...state, customerOrders: null };
  case CUSTOMER_DATA_ERROR:
   return { ...state, customerData: null };
  case CUSTOMER_SET_SORT:
   return { ...state, sortBy: action.sortBy, sortDirection: action.direction };
  default:
   return state;
 }
};
