import { OrderT } from './Orders';

export const ORDERS_LOAD_ORDERS_SUCCESS = 'ORDERS_LOAD_ORDERS_SUCCESS';
export const ORDERS_LOAD_ORDERS_ERROR = 'ORDERS_LOAD_ORDERS_ERROR';

export interface loadOrdersSuccessT {
 type: typeof ORDERS_LOAD_ORDERS_SUCCESS;
 orders: OrderT[];
}
export interface loadOrdersErrorT {
 type: typeof ORDERS_LOAD_ORDERS_ERROR;
}

export type ordersActionsT = loadOrdersErrorT | loadOrdersSuccessT;
