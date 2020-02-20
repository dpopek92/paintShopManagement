import {
 GET_ORDER_BY_ID,
 REMOVE_ORDER,
 ORDERS_LOADED,
 ORDERS_LOADED_ERROR,
 SEARCH_ORDER,
 ORDERS_LOAD_REQUEST,
 CUSTOMER_ORDERS_IN_PROD,
} from '../actions/types';

//STORE WITH: TOKEN, USER INFO, USER ORDERS
const initialState = {
 order: null,
 ordersInProd: null,
 list: null,
 searchValue: '',
};

export default (state = initialState, action) => {
 switch (action.type) {
  case SEARCH_ORDER:
   return {
    ...state,
    searchValue: action.value,
   };
  case GET_ORDER_BY_ID:
   return {
    ...state,
    order: action.order,
   };
  case CUSTOMER_ORDERS_IN_PROD:
   return {
    ...state,
    ordersInProd: action.orders,
   };
  case REMOVE_ORDER:
   return {
    ...state,
    order: null,
   };
  case ORDERS_LOAD_REQUEST:
   return {
    ...state,
   };
  case ORDERS_LOADED:
   return {
    ...state,
    list: action.payload,
   };
  case ORDERS_LOADED_ERROR:
   return {
    ...state,
    list: null,
   };

  default:
   return state;
 }
};
