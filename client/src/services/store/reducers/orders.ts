import { OrdersT } from '../types/orders/Orders';
import {
 ordersActionsT,
 ORDERS_LOAD_ORDERS_ERROR,
 ORDERS_LOAD_ORDERS_SUCCESS,
} from '../types/orders/actions';

const initialState: OrdersT = {
 orders: [],
 order: null,
 sortBy: {
  new: 'company',
  ended: 'finishDate',
 },
 sortDirection: {
  new: 'ascend',
  ended: 'ascend',
 },
};

const ordersReducer = (state = initialState, action: ordersActionsT) => {
 switch (action.type) {
  case ORDERS_LOAD_ORDERS_ERROR: {
   return { ...state, orders: [] };
  }
  case ORDERS_LOAD_ORDERS_SUCCESS: {
   return { ...state, orders: action.orders };
  }
  default:
   return state;
 }
};

export { ordersReducer };
